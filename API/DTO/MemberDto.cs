using Domain;

namespace API.DTO
{
    public class MemberDto
{
    public string Id { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateTime RegisterDate { get; set; }
    public List<Address> Addresses { get; set; } = [];
    public List<FamilyMember> FamilyMembers { get; set; } = [];
    public List<MemberFileDto> MemberFiles { get; set; } = [];
    public List<PaymentDto> Payments { get; set; } = [];
    public List<IncidentDto> Incidents { get; set; } = [];
}
}