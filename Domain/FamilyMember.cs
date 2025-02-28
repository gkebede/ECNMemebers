namespace Domain
{
    public class FamilyMember
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }


        // Foreign key
        public string MemberId { get; set; } = null!;
        // Navigation property
        public Member Member { get; set; } = null!;
    }
}



