
using Application.Core;
using AutoMapper;
using MediatR;
using Domain;
using Microsoft.AspNetCore.Identity;
using Application.Dtos;
using System.Security.Claims;

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

    // Generate unique username
    string baseUsername = $"{request.MemberDto.FirstName}_{request.MemberDto.LastName}";
    string uniqueUsername = baseUsername;
    int suffix = 1;

    while (await _userManager.FindByNameAsync(uniqueUsername) != null)
    {
        uniqueUsername = $"{baseUsername}{suffix++}";
    }

    member.UserName = uniqueUsername;

    var result = await _userManager.CreateAsync(member, "Default@123");
    if (!result.Succeeded)
    {
        var errorMessage = string.Join(", ", result.Errors.Select(e => e.Description));
        return Result<string>.Failure(errorMessage);
    }

    // Optional: assign roles and claims
    var role = request.MemberDto.IsAdmin ? "Admin" : "Member";
    await _userManager.AddToRoleAsync(member, role);
    await _userManager.AddClaimsAsync(member, new List<Claim>
    {
        new Claim(ClaimTypes.Name, member.UserName ?? ""),
        new Claim(ClaimTypes.Email, member.Email ?? ""),
        new Claim(ClaimTypes.MobilePhone, member.PhoneNumber ?? ""),
        new Claim(ClaimTypes.Role, role)
    });

    await _signInManager.SignInAsync(member, isPersistent: false);

    return Result<string>.Success(member.Id);
}

        }
    }

}