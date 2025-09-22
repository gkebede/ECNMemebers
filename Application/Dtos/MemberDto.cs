using Microsoft.AspNetCore.Http;

namespace Application.Dtos
{
     public class MemberDto
    {
        public string? Id { get; set; } 
        public required string FirstName { get; set; }
        public string? Password { get; set; }
        
        public string? MiddleName { get; set; }
        public required string LastName { get; set; }
        public int? ReceiverId { get; set; } 
       
        public  string? Email { get; set; } 
        public string? UserName { get; set; } 
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; } = false;
        public string? RegisterDate { get; set; }

        public List<AddressDto> Addresses { get; set; } = new();
        public List<FamilyMemberDto> FamilyMembers { get; set; } = new();
        public List<MemberFileDto> MemberFiles { get; set; } = new();   
        public List<PaymentDto> Payments { get; set; } = new();
        public List<IncidentDto> Incidents { get; set; } = new();
    }
}