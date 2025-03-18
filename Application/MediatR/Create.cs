
using Application.Core;
using AutoMapper;
using MediatR;
using Domain;
using Microsoft.AspNetCore.Identity;
using Application.Dtos;

namespace Application.MediatR
{
    public class Create
    {
        public class Command : IRequest<Result<Member>>
        {
            public MemberDto? MemberDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Member>>
        {
            private readonly IMapper _mapper;
            private readonly UserManager<Member> _userManager;
            private readonly SignInManager<Member> _signInManager;

            public Handler(IMapper mapper, UserManager<Member> userManager, SignInManager<Member> signInManager)
            {
                _mapper = mapper;
                _userManager = userManager;
                _signInManager = signInManager;
            }

            public async Task<Result<Member>> Handle(Command request, CancellationToken cancellationToken)
            {     //! member === newMember -BUT- b/c of inheritance we have to create a Member instade of IdentityUser
            //! and userMang/singinmanager must be Generic type of Member NOT IdentityUser HERE
                 //! This is a temporary solution to create a new user with a password.
                //! The password should be hashed and salted before storing it in the database.
                if (request.MemberDto == null)
                {
                    return Result<Member>.Failure("Member cannot be null.");
                }

                // Map MemberDto to Member
                var member = _mapper.Map<Member>(request.MemberDto);
                // Optionally, set additional properties for Member if needed
                member.UserName = request.MemberDto.Email; // Ensure UserName is set
                member.Email = request.MemberDto.Email;

                var result = await _userManager.CreateAsync(member, "Default@123"); // Replace with secure password handling

                var newMember = new IdentityUser { UserName = request.MemberDto.Email, Email = request.MemberDto.Email };
               
                if (!result.Succeeded)
                {
                    var errorMessage = string.Join(", ", result.Errors.Select(e => e.Description));
                    return Result<Member>.Failure(errorMessage);
                }

                await _signInManager.SignInAsync(member, isPersistent: false);

                return Result<Member>.Success(member);
            }
        }
    }

}