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

            // FluentValidation for the command
            public class CreateMemberValidator : AbstractValidator<CreateMember.Command>
            {
                public CreateMemberValidator()
                {
                    RuleFor(x => x.MemberDto).NotNull();
                    RuleFor(x => x.MemberDto!.Email).NotEmpty().EmailAddress();
                    RuleFor(x => x.MemberDto!.PhoneNumber).NotEmpty();
                    RuleFor(x => x.MemberDto!.FirstName).NotEmpty();
                    RuleFor(x => x.MemberDto!.LastName).NotEmpty();
                    RuleFor(x => x.MemberDto!.Password).MinimumLength(6);
                }
            }

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.MemberDto == null)
                    return Result<string>.Failure("Member cannot be null.");

                // Check email uniqueness
                if (string.IsNullOrWhiteSpace(request.MemberDto.Email))
                    return Result<string>.Failure("Email is required.");

                if (await _userManager.FindByEmailAsync(request.MemberDto.Email) != null)
                    return Result<string>.Failure("Email already exists.");

                // Map DTO to Member entity
                var member = _mapper.Map<Member>(request.MemberDto);
                member.Id = Guid.NewGuid().ToString();

                // Generate a unique username
                string baseUsername = $"{request.MemberDto.FirstName}_{request.MemberDto.LastName}";
                string uniqueUsername = baseUsername;
                int suffix = 1;

                while (await _userManager.FindByNameAsync(uniqueUsername) != null)
                {
                    uniqueUsername = $"{baseUsername}_{suffix}";
                    suffix++;
                }
                member.UserName = uniqueUsername;

                // Map nested collections
                member.Addresses = request.MemberDto.Addresses != null
                    ? _mapper.Map<List<Address>>(request.MemberDto.Addresses)
                    : new List<Address>();

                member.FamilyMembers = request.MemberDto.FamilyMembers != null
                    ? _mapper.Map<List<FamilyMember>>(request.MemberDto.FamilyMembers)
                    : new List<FamilyMember>();

                member.Incidents = request.MemberDto.Incidents != null
                    ? _mapper.Map<List<Incident>>(request.MemberDto.Incidents)
                    : new List<Incident>();

                member.Payments = request.MemberDto.Payments != null
                    ? _mapper.Map<List<Payment>>(request.MemberDto.Payments)
                    : new List<Payment>();

                // Handle MemberFiles with uploaded file bytes
                member.MemberFiles = new List<MemberFile>();
                if (request.MemberDto.MemberFiles != null && request.MemberDto.MemberFiles.Any())
                {
                    foreach (var fileDto in request.MemberDto.MemberFiles)
                    {
                        using var ms = new MemoryStream();
                        await fileDto.File.CopyToAsync(ms, cancellationToken);

                        member.MemberFiles.Add(new MemberFile
                        {
                            Id = Guid.NewGuid(),
                            FileName = fileDto.File.FileName,
                            ContentType = fileDto.File.ContentType,
                            Content = ms.ToArray(),
                            FileDescription = fileDto.FileDescription
                        });
                    }
                }

                member.IsActive = true;

                // Create member with hashed password
                var result = await _userManager.CreateAsync(member, request.MemberDto.Password ?? "Default@123");
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
