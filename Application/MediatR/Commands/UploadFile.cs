using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Application.Dtos;
using Domain;
using Application.Core;
using Persistence;

public class UploadFile
{
    public class Command : IRequest<Result<List<MemberFileDto>>>
    {
        public Guid MemberId { get; set; }
        public List<IFormFile> Files { get; set; } = new();
        public string? FileDescription { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<List<MemberFileDto>>>
    {
        private readonly AppDbContext _dbContext;

        public Handler(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Result<List<MemberFileDto>>> Handle(Command request, CancellationToken cancellationToken)
        {
            var member = await _dbContext.Members
                .Include(m => m.MemberFiles)
                .FirstOrDefaultAsync(m => m.Id == request.MemberId.ToString(), cancellationToken);

            if (member == null)
                return Result<List<MemberFileDto>>.Failure("Member not found.");

            var uploadedFiles = new List<MemberFile>();

            foreach (var formFile in request.Files)
            {
                if (formFile.Length > 0)
                {
                    var uploadDir = Path.Combine("Uploads", member.Id.ToString());
                    Directory.CreateDirectory(uploadDir);

                    var uniqueFileName = $"{Guid.NewGuid()}_{formFile.FileName}";
                    var filePath = Path.Combine(uploadDir, uniqueFileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream, cancellationToken);
                    } 

                    var memberFile = new MemberFile
                    {
                        Id = Guid.NewGuid(),
                        FileName = formFile.FileName,
                        FileDescription = request.FileDescription,
                        FilePath = Path.Combine("Uploads", member.Id.ToString(), uniqueFileName).Replace("\\", "/"),
                        ContentType = formFile.ContentType,
                        MemberId = member.Id
                    };

                    _dbContext.MemberFiles.Add(memberFile);
                    uploadedFiles.Add(memberFile);
                }
            }

            var changes = await _dbContext.SaveChangesAsync(cancellationToken);
            Console.WriteLine($"Rows affected: {changes}");

            var dtoList = uploadedFiles.Select(f => new MemberFileDto
            {
                Id = f.Id.ToString(),
                FileName = f.FileName,
                FilePath = f.FilePath?? string.Empty,
                ContentType = f.ContentType,
                FileDescription = f.FileDescription
            }).ToList();

            return Result<List<MemberFileDto>>.Success(dtoList);
        }
    }
}
