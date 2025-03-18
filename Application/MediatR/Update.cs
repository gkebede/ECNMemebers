using Application.Core;
using Application.Dtos;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
                .FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);
                //  var member = await _context.Members.FindAsync(request.Id);
                if (member == null) return Result<Member>.Failure("No member found.");

                //! Updating navigation properties
                UpdateNavigationEntities(member.Addresses, request.MemberDto.Addresses,
                 (a, ad) => _mapper.Map(ad, a));

                UpdateNavigationEntities(member.FamilyMembers, request.MemberDto.FamilyMembers, 
                (f, fm) => _mapper.Map(fm, f));  

                UpdateNavigationEntities(member.MemberFiles, request.MemberDto.MemberFiles, 
                (mf, mfd) => _mapper.Map(mfd, mf)); 

                UpdateNavigationEntities(member.Payments, request.MemberDto.Payments,
                 (p, pd) => _mapper.Map(pd, p)); 

                UpdateNavigationEntities(member.Incidents, request.MemberDto.Incidents,
                 (i, id) => _mapper.Map(id, i));  


                _mapper.Map(request.MemberDto, member);

                var identityResult = await _userManager.UpdateAsync(member);
                if (!identityResult.Succeeded)
                {
                    return Result<Member>.Failure(string.Join("; ", identityResult.Errors.Select(e => e.Description)));
                }

                return Result<Member>.Success(member);
            }

            //!!! to UpdateNavigation Entities

            //! PLEAE NOTE why we say ==> where T : class   --  because we want to make sure that T is a reference type not value type
        //!If we didn't specify where T : class, someone could mistakenly call the method with List<int> or List<bool>
            private void UpdateNavigationEntities<T, TDto>(
                                ICollection<T> entities,    ICollection<TDto> dtos, 
                                Action<T, TDto> updateAction
                                ) where T : class
           { 
                var dtoIds = dtos.Select(d => (d as dynamic)?.Id).ToList();
                var entityIds = entities.Select(e => (e as dynamic).Id).ToList();

                // Remove entities that are not in the DTOs
                var entitiesToRemove = entities.Where(e => !dtoIds.Contains((e as dynamic).Id)).ToList();
                foreach (var entity in entitiesToRemove)
                {
                    entities.Remove(entity);
                }

                // Add new entities
                foreach (var dto in dtos)
                {
                    var entity = entities.FirstOrDefault(e => (e as dynamic)?.Id == (dto as dynamic)?.Id);
                    if (entity == null)
                    {
                        entity = Activator.CreateInstance<T>();
                        _mapper.Map(dto, entity);
                        entities.Add(entity);
                    }
                    else
                    {
                        updateAction(entity, dto);
                    }
                }
            }
        }
    }
}