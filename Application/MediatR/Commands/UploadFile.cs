

using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.MediatR.Commands
{
    public class UploadFile
{
    public class Command : IRequest<Result<MemberFile>>
    {
        public Guid MemberId { get; set; }
        public IFormFile File { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<MemberFile>>
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<Member> _userManager;

        public Handler(AppDbContext dbContext, UserManager<Member> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<Result<MemberFile>> Handle(Command request, CancellationToken cancellationToken)
        {
            var member = await _userManager.FindByIdAsync(request.MemberId.ToString());
            if (member == null)
                return Result<MemberFile>.Failure("Member not found.");

            if (request.File == null || request.File.Length == 0)
                return Result<MemberFile>.Failure("No file uploaded.");

            using var ms = new MemoryStream();
            await request.File.CopyToAsync(ms, cancellationToken);

            var memberFile = new MemberFile
            {
                Id = Guid.NewGuid(),
                FileName = request.File.FileName,
                ContentType = request.File.ContentType ?? "application/octet-stream",
                Data = ms.ToArray(),
                MemberId = member.Id
            };

            await _dbContext.MemberFiles.AddAsync(memberFile, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Result<MemberFile>.Success(memberFile);
        }
    }
}

}
    
 