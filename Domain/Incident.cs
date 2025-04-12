
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain
{

    public class Incident
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        //[Column(TypeName = "nvarchar(50)")]

        public int EventNumber { get; set; }
        public IncidentType IncidentType { get; set; } // Enum instead of string
        public string? IncidentDescription { get; set; }
       // public DateTime IncidentDate { get; set; }
        public string IncidentDate { get; set; } = DateTime.Today.ToString("MM/dd/yyyy");

        // Foreign key
           [Required]
        public string MemberId { get; set; } = null!;
        // Navigation property
            [JsonIgnore]
        public Member Member { get; set; } = null!;
    }

    public enum IncidentType
    {
        AccidentalDeath ,
        NaturalDeath
    }
// 
}