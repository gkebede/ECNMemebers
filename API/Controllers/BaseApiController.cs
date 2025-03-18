using Application.Core;
using Application.Dtos;

using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;
        public MemberDto MemberDto { get; set; } = null!;
        //     protected IMediator[] Mediator => _mediator??= (IMediator[])(HttpContext.RequestServices.GetServices<IMediator>());
        //! other way of dependency injection to get the services like DataContext === Imediator as the ff
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()!;


        protected ActionResult HandleResult<T>(Result<T> result)
        {
            

            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            if (result.IsSuccess && result.Value == null)
            {
                return NotFound();
            }
            return BadRequest(result.Error);
        }

 

    }
}