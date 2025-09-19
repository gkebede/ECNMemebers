
using Application.Core;
using AutoMapper;
using MediatR;
using Domain;
using Microsoft.AspNetCore.Identity;
using Application.Dtos;
using FluentValidation;

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
            
            public class CreateMemberValidator : AbstractValidator<CreateMember.Command>
{
                public CreateMemberValidator()
                {
                    RuleFor(x => x.MemberDto).NotNull();
                    RuleFor(x => x.MemberDto!.Email).NotEmpty().EmailAddress();
                    RuleFor(x => x.MemberDto!.PhoneNumber).NotEmpty();
                    RuleFor(x => x.MemberDto!.FirstName).NotEmpty();
                    RuleFor(x => x.MemberDto!.LastName).NotEmpty();
                    // RuleFor(x => x.MemberDto.Password).MinimumLength(6);
                }
}




            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {     //! member === newMember -BUT- b/c of inheritance we have to create a Member instade of IdentityUser
                  //! and userMang/singinmanager must be Generic type of Member NOT IdentityUser HERE

                //! The password should be hashed and salted before storing it in the database.
                if (request.MemberDto == null)
                    return Result<string>.Failure("Member cannot be null.");

                if (string.IsNullOrWhiteSpace(request.MemberDto.Email))
                    return Result<string>.Failure("Email is required.");

                if (await _userManager.FindByEmailAsync(request.MemberDto.Email) != null)
                    return Result<string>.Failure("Email already exists.");

                if (string.IsNullOrWhiteSpace(request.MemberDto.PhoneNumber))
                    return Result<string>.Failure("Phone number cannot be null or empty.");

                if (_userManager.Users.Any(u => u.PhoneNumber == request.MemberDto.PhoneNumber))
                    return Result<string>.Failure("Phone number already exists.");

                var member = _mapper.Map<Member>(request.MemberDto);

                member.Id = Guid.NewGuid().ToString();
                

                // Generate unique username
                string baseUsername = $"{request.MemberDto.FirstName}_{request.MemberDto.LastName}";
                string uniqueUsername = baseUsername;
                
                member.UserName = uniqueUsername;

                if (await _userManager.FindByEmailAsync(member.UserName) != null)
                    return Result<string>.Failure("Username already exists.");



                // Optional: assign roles and claims
                // var role = request.MemberDto.IsAdmin ? "Admin" : "Member";
                // await _userManager.AddToRoleAsync(member, role);
                // await _userManager.AddClaimsAsync(member, new List<Claim>
                // {
                //     new Claim(ClaimTypes.Name, member.UserName ?? ""),
                //     new Claim(ClaimTypes.Email, member.Email ?? ""),
                //     new Claim(ClaimTypes.MobilePhone, member.PhoneNumber ?? ""),
                //     new Claim(ClaimTypes.Role, role)
                // });

                  if (request.MemberDto.Addresses != null && request.MemberDto.Addresses.Any())
                  {
                      member.Addresses = _mapper.Map<List<Address>>(request.MemberDto.Addresses);
                  }
                  else
                  {
                      member.Addresses = new List<Address>();
                  }
        member.MemberFiles = request.MemberDto.MemberFiles != null
            ? _mapper.Map<List<MemberFile>>(request.MemberDto.MemberFiles)
            : new List<MemberFile>();

            // Removed erroneous assignment: MemberDto does not have a FamilyMember property.

        member.FamilyMembers = request.MemberDto.FamilyMembers != null
            ? _mapper.Map<List<FamilyMember>>(request.MemberDto.FamilyMembers)
            : new List<FamilyMember>();

     member.Incidents = request.MemberDto.Incidents != null
            ? _mapper.Map<List<Incident>>(request.MemberDto.Incidents)
            : new List<Incident>();

                member.Payments = request.MemberDto.Payments != null
                ? _mapper.Map<List<Payment>>(request.MemberDto.Payments)
                : new List<Payment>();

                member.IsActive = true;
 
   

                var result = await _userManager.CreateAsync(member, "Default@123");
                if (!result.Succeeded)
                {
                    var errorMessage = string.Join(", ", result.Errors.Select(e => e.Description));
                    return Result<string>.Failure(errorMessage);
                }
                // Optional: sign in the user after registration
                await _signInManager.SignInAsync(member, isPersistent: false);
                return Result<string>.Success(member.Id);
            }

        }
    }

}