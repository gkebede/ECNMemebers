using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Dtos;
using Application.MediatR;
using Application.MediatR.Commands;

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

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, Guid memberId)
        {
            var result = await Mediator.Send(new UploadFile.Command { File = file, MemberId = memberId });
            return Ok(result);
        }
    }

}

