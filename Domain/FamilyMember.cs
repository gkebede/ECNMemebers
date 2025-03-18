using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class FamilyMember
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
       public string? Relationship { get; set; }


        // Foreign key
           [Required]
        public string MemberId { get; set; } = null!;
        // Navigation property
        [JsonIgnore]
        public Member Member { get; set; } = null!;
    }
}



