
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{

    public class Incident
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public IncidentType IncidentType { get; set; } // Enum instead of string
        public string? IncidentDescription { get; set; }
        public DateTime IncidentDate { get; set; }

        // Foreign key
        public string MemberId { get; set; } = null!;
        // Navigation property
        public Member Member { get; set; } = null!;
    }

    public enum IncidentType
    {
        AccidentalDeath ,
        NaturalDeath
    }
// 
}