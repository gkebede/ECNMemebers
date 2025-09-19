using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Dtos;
using Application.MediatR;
using Application.MediatR.Queries;

namespace API.Controllers
{
    public class MembersController : BaseApiController
    {

        [HttpGet]
        //public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers()
        public async Task<ActionResult<List<MemberDto>>> GetMembers()
        {
            // using axios == output => response.data.value
            var result = await Mediator.Send(new GetMemberList.Query());
            return HandleResult(result);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetMember(Guid id)
        {
            var result = await Mediator.Send(new MemberDetails.Query { Id = id });
            return Ok(HandleResult(result));
        }

        //    [HttpGet("search/{value}")]
        // public async Task<IActionResult> GetMemberByValue(string value)
        // {
        //     var result = await Mediator.Send(new MemberDetails.Query { SearchString = searchString });
        //     return Ok(HandleResult(result));
        // }


        [HttpPost]
        public async Task<ActionResult<Member>> Create(MemberDto member)
        {
            var result = await Mediator.Send(new CreateMember.Command { MemberDto = member });

            //Console.WriteLine($"UserName: {member.UserName}");
            return HandleResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(string id, MemberDto member)
        {
            var result = await Mediator.Send(new Update.Command(id, member));
            return Ok(HandleResult(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });
            return Ok(HandleResult(result));
        }

        // uploads files
        [HttpPost("uploads/{memberId}")]
        public async Task<IActionResult> UploadFiles(
         [FromRoute] Guid memberId,
         [FromForm] List<IFormFile> files,
         [FromForm] string? fileDescription) // <-- Capture this explicitly
        {

            const long maxFileSize = 10 * 1024 * 1024; // 10 MB
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".pdf" };

            if (files == null || !files.Any())
                return BadRequest("No files uploaded.");


            foreach (var file in files)
            {
                var extension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest($"Unsupported file type: {extension}");

                if (file.Length > maxFileSize)
                    return BadRequest($"File '{file.FileName}' exceeds size limit (10MB).");

            }


            var result = await Mediator.Send(new UploadFile.Command
            {
                MemberId = memberId,
                Files = files,
                FileDescription = fileDescription // <-- Pass it here
            });

            return result.IsSuccess
    ? Ok(new
    {
        message = "Files uploaded successfully.",
        files = result.Value // assumed to contain file metadata
    })
    : BadRequest(result.Error);
        }

        // Get ingle file
        [HttpGet("file/{memberId}")]
        public async Task<IActionResult> GetSingleFile(Guid memberId)
        {
            var result = await Mediator.Send(new GetMembeFiles.Query { Id = memberId });

            if (result == null || result.Value == null || !result.Value.Any())
                return NotFound();

            return Ok(result.Value.First()); // returns single File
        }

        // Get list of files
        [HttpGet("files/{memberId}")]
        public async Task<IActionResult> GetFiles(Guid memberId)
        {

            var result = await Mediator.Send(new GetMembeFiles.Query
            {
                Id = memberId
            });


            return Ok(result);
        }


    }
}


