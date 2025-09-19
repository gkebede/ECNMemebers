using Application.Core;
using Application.Dtos;
using Application.Utilities;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using Persistence;

// todo UserManager<TUser> in Entity Framework (when using ASP.NET Core Identity) does not automatically update navigation properties when updating the main entity (e.g., IdentityUser or your Member class). It primarily handles user-related operations like creating, updating, deleting users, and managing roles, claims, and passwords.

namespace Application.MediatR
{

    public class Update
    {

        public class Command : IRequest<Result<Member>>
        {
            public string Id { get; set; }
            public MemberDto MemberDto { get; set; }

            public Command(string id, MemberDto memberDto)
            {
                Id = id ?? throw new ArgumentNullException(nameof(id));
                MemberDto = memberDto ?? throw new ArgumentNullException(nameof(memberDto));
            }
        }

        public class Handler : IRequestHandler<Command, Result<Member>>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;
            private readonly UserManager<Member> _userManager;

            public Handler(AppDbContext context, IMapper mapper, UserManager<Member> userManager)
            {
                _userManager = userManager;
                _mapper = mapper;
                _context = context;
            }



            public async Task<Result<Member>> Handle(Command request, CancellationToken cancellationToken)
            {
                var member = await _context.Members
                    .Include(m => m.Payments)
                    .Include(m => m.Addresses)
                    .Include(m => m.FamilyMembers)
                    .Include(m => m.MemberFiles)
                    .Include(m => m.Incidents)
                    .FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

                if (member == null) return Result<Member>.Failure("No member found.");

                // Map/update simple scalar properties from DTO
                _mapper.Map(request.MemberDto, member);

                // Update navigations - inside EntityUpdater, make sure to:
                // - Add new items with _context.Add(...)
                // - Remove deleted items with _context.Remove(...)
                // - Update existing items by mapping over them
                EntityUpdater.UpdateMemberNavigation(member.Addresses, request.MemberDto.Addresses, _mapper, (Id) => Id);
                EntityUpdater.UpdateMemberNavigation(member.FamilyMembers, request.MemberDto.FamilyMembers, _mapper, (Id) => Id);
                EntityUpdater.UpdateMemberNavigation(member.MemberFiles, request.MemberDto.MemberFiles, _mapper, (Id) => Id);
                EntityUpdater.UpdateMemberNavigation(member.Payments, request.MemberDto.Payments, _mapper, (Id) => Id);
                EntityUpdater.UpdateMemberNavigation(member.Incidents, request.MemberDto.Incidents, _mapper, (Id) => Id);

                // Update the core IdentityUser fields only if they changed
                // For example, if the MemberDto has Email or UserName:
                if (member.Email != request.MemberDto.Email)
                {
                    member.Email = request.MemberDto.Email;
                    // You might want to call UserManager.UpdateAsync here for user specific fields only
                    var identityResult = await _userManager.UpdateAsync(member);
                    if (!identityResult.Succeeded)
                    {
                        return Result<Member>.Failure(string.Join("; ", identityResult.Errors.Select(e => e.Description)));
                    }
                }

                // Persist all other changes (navigation props etc)
                await _context.SaveChangesAsync(cancellationToken);

                return Result<Member>.Success(member);
            }
        }
    }
}