
using Application.Core;
using AutoMapper;
using MediatR;
using Domain;
using Microsoft.AspNetCore.Identity;
using Application.Dtos;

namespace Application.MediatR
{
    public class CreateMember
    {
        public class Command : IRequest<Result<string>>
        {
            public MemberDto? MemberDto { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<string>>
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


            

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {     //! member === newMember -BUT- b/c of inheritance we have to create a Member instade of IdentityUser
            //! and userMang/singinmanager must be Generic type of Member NOT IdentityUser HERE
                 
                //! The password should be hashed and salted before storing it in the database.
                //Make sure Id is not required in the DTO. since it is generated in serverside 
                if (request.MemberDto == null)
                {
                    return Result<string>.Failure("Member cannot be null.");
                }


                var member = _mapper.Map<Member>(request.MemberDto);
                
                //! This is a temporary solution to create a new user with a password.
                var result = await _userManager.CreateAsync(member, "Default@123"); // Replace with secure password handling

                var newMember = new IdentityUser { UserName = request.MemberDto.Email, Email = request.MemberDto.Email };
               
                if (!result.Succeeded)
                {
                    var errorMessage = string.Join(", ", result.Errors.Select(e => e.Description));
                    return Result<string>.Failure(errorMessage);
                }

                await _signInManager.SignInAsync(member, isPersistent: false);

                return Result<string>.Success(member.Id);
            }
        }
    }

}