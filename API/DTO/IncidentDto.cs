namespace API.DTO
{
    public class IncidentDto
    {
    public string Id { get; set; } = null!;
    public string IncidentType { get; set; } = null!;
    public string? IncidentDescription { get; set; }
    public DateTime IncidentDate { get; set; }
    }
}