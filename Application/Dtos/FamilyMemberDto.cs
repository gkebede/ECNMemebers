

namespace Application.Dtos
{
    public class FamilyMemberDto
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? Relationship { get; set; }
    }
}