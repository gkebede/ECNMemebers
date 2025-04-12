using Application.Core;
using Application.Dtos;
using Application.Utilities;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
                .Include(m => m.Payments)  // Ensure Payments are loaded
                .Include(m => m.Addresses)
                .Include(m => m.FamilyMembers)
                .Include(m => m.MemberFiles)
                .Include(m => m.Incidents)
                //.AsTracking()  // Ensures that EF Core tracks the changes
                .FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

                
                //  var member = await _context.Members.FindAsync(request.Id);
                if (member == null) return Result<Member>.Failure("No member found.");

 
                EntityUpdater.UpdateMemberNavigation(member.Addresses, request.MemberDto.Addresses,_mapper,(Id) =>Id);
                EntityUpdater.UpdateMemberNavigation(member.FamilyMembers, request.MemberDto.FamilyMembers,_mapper,(Id) =>Id);
                EntityUpdater.UpdateMemberNavigation(member.MemberFiles, request.MemberDto.MemberFiles,_mapper,(Id) =>Id);
                EntityUpdater.UpdateMemberNavigation(member.Payments, request.MemberDto.Payments,_mapper,(Id) =>Id);
                EntityUpdater.UpdateMemberNavigation(member.Incidents, request.MemberDto.Incidents,_mapper,(Id) =>Id);

                // EntityUpdater.UpdateNavigationEntities(member.Addresses, request.MemberDto.Addresses,
                // _mapper, dto => dto.Id, (f, fm) => _mapper.Map(fm, f));

                // EntityUpdater.UpdateNavigationEntities(member.FamilyMembers, request.MemberDto.FamilyMembers,
                // _mapper, dto => dto.Id, (f, fm) => _mapper.Map(fm, f));

                // EntityUpdater.UpdateNavigationEntities(member.MemberFiles, request.MemberDto.MemberFiles,
                // _mapper, dto => dto.Id, (mf, mfd) => _mapper.Map(mfd, mf));

                // EntityUpdater.UpdateNavigationEntities(member.Payments, request.MemberDto.Payments,
                //  _mapper, dto => dto.Id, (p, pd) => _mapper.Map(pd, p));

                // EntityUpdater.UpdateNavigationEntities(member.Incidents, request.MemberDto.Incidents,
                //  _mapper, dto => dto.Id, (i, id) => _mapper.Map(id, i));



                _mapper.Map(request.MemberDto, member);

                member.RegisterDate ??= DateTime.Today.ToString("MM/dd/yyyy");

                member.DisplayName = request.MemberDto.FirstName;

                var identityResult = await _userManager.UpdateAsync(member);
                if (!identityResult.Succeeded)
                {
                    return Result<Member>.Failure(string.Join("; ", identityResult
                    .Errors.Select(e => e.Description)));
                }



                return Result<Member>.Success(member);
            }

            }
    }
}