using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Dtos;
using Application.MediatR;

namespace API.Controllers
{
    public class MembersController : BaseApiController
    {

        [HttpGet]
        //public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers()
        public async Task<ActionResult<List<MemberDto>>> GetMembers()
        {
            // using axios == output => response.data.value
            var result = await Mediator.Send(new List.Query());
            return HandleResult(result);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetMember(string id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return Ok(HandleResult(result));
        }


        [HttpPost]
        public async Task<ActionResult<Member>>Create(MemberDto member)
        {
            var result = await Mediator.Send(new Create.Command { MemberDto = member });
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
            var result = await Mediator.Send(new Delete.Command{ Id = id });
            return Ok(HandleResult(result));
        }
    }

 

}

