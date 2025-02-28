
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{


    public class Payment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public double PaymentAmount { get; set; }
    public DateTime PaymentDate { get; set; }
    [Required]
    [Column(TypeName = "nvarchar(50)")]
    public PaymentType PaymentType { get; set; } // Enum instead of string

    [Required]
    [Column(TypeName = "nvarchar(50)")] //  string instead of  Enum
    public PaymentRecurringType PaymentRecurringType { get; set; } // Enum instead of string

    // Foreign key
    public string MemberId { get; set; } = null!;
    public Member Member { get; set; } = null!;
}


public enum PaymentType
{
    Cash = 0,
    CreditCard=1,
    BankTransfer=2, 
    Check=3
}

public enum PaymentRecurringType
{
    Annual ,    // Payments made once a year
    Monthly,   // Payments made every month
    Quarterly, // Payments made every three months
    Incident   // Emergency or one-time payments due to unforeseen situations
}
 
}