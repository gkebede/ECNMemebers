
namespace Application.Dtos
{
    public class PaymentDto
    {
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public double PaymentAmount { get; set; }
    // public DateTime PaymentDate { get; set; }
    public string PaymentDate { get; set; } = DateTime.Today.ToString("MM/dd/yyyy");
    public string? PaymentType { get; set; } 
    public string? PaymentRecurringType { get; set; } 
    }
}

 
