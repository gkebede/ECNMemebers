


namespace Domain
{
    public class Address
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? ZipCode { get; set; }

        // Foreign key
        public string MemberId { get; set; } = null!;
        // Navigation property
        public Member Member { get; set; } = null!;

    }
}





