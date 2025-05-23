namespace Application.Dtos
{
    public class MemberDto
    {
       // public string? Id { get; set; } = Guid.NewGuid().ToString();
       public string? Id { get; set; } 
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; } 
       public  string? UserName { get; set; } 
       public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; } =false;
         public string? RegisterDate { get; set; }

    
        public List<AddressDto> Addresses { get; set; } = [];
        public List<FamilyMemberDto> FamilyMembers { get; set; } = [];
        public List<MemberFileDto> MemberFiles { get; set; } = [];
        public List<PaymentDto> Payments { get; set; } = [];
        public List<IncidentDto> Incidents { get; set; } = [];
    }
}