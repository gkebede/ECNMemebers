
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace API.Controllers
{

    public class PaymentsController : BaseApiController
    {
        private readonly ILogger<PaymentsController> _logger;

        public PaymentsController(ILogger<PaymentsController> logger)
        {
            _logger = logger;
        }
        [HttpPost]
        public ActionResult Create()
        {
            var domain = "https://localhost:5001/api/";
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    Price = "{{PRICE_ID}}",
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                SuccessUrl = domain + "/success.html",
                CancelUrl = domain + "/cancel.html",
            };
            var service = new SessionService();
            Session session = service.Create(options);

            Response.Headers.Append("Location", session.Url);
            return new StatusCodeResult(303);
        }
    }
}