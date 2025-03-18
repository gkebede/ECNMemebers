using Application.Core;
using Application.Dtos;
using AutoMapper.Execution;
using Domain;
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

        protected ActionResult HandleNavigatonTablesing<T>(List<T> result) where T : IMember
        {
            if (result == null) return NotFound();
            if (result.Count > 0)
            {
                foreach (var item in result)
                {
                    var differentPayments = item.Payments
                    .Where(p => p.PaymentAmount != MemberDto.PaymentAmount)
                    .ToList();
                    return Ok(item);
                }
                return Ok(result);
            }
            return NotFound();
        }
        //! PLEAE NOTE why we say ==> where T : class   --  because we want to make sure that T is a reference type not value type
        //!If we didn't specify where T : class, someone could mistakenly call the method with List<int> or List<bool>

        protected ActionResult HandleNavigationTables<T>(
                List<T> navigationList,
                Func<T, bool> detectChanges,  // A function to check for changes
                Action<T> updateFields        // A function to apply updates
            ) where T : class
        {
            if (navigationList == null || navigationList.Count == 0)
                return NotFound("No related records found.");

            var modifiedItems = navigationList.Where(detectChanges).ToList();

            if (modifiedItems.Count > 0)
            {
                foreach (var item in modifiedItems)
                {
                    //   var adress =  item.Addresses.Select(a => a.City == MemberDto.Addresses[0].City).ToList();
                    //    var FamilyMember = item.FamilyMembers.Select(f => f.FirstName == MemberDto.FamilyMembers[0].FirstName).ToList();  
                    //   var MemberFile =  item.MemberFiles.Select(m => m.FileName == MemberDto.MemberFiles[0].FileName).ToList();
                    //    var Incident = item.Incidents.Select(i => i.IncidentDescription == MemberDto.Incidents[0].IncidentDescription).ToList();

                    updateFields(item);  // Apply the necessary updates
                }
                return Ok(modifiedItems);
            }

            return NotFound("No changes detected.");
        }



        public interface IMember
        {
            List<Payment> Payments { get; set; }
            List<Address> Addresses { get; set; }
            List<FamilyMember> FamilyMembers { get; set; }
            List<MemberFile> MemberFiles { get; set; }
            List<Incident> Incidents { get; set; }
        }

    }
}