namespace Application.Dtos
{
    public class IncidentDto
    {
     public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? IncidentType { get; set; } = null!;
    public string? IncidentDescription { get; set; }
    //public DateTime IncidentDate { get; set; }
    public string PaymentDate { get; set; } = DateTime.Today.ToString("MM/dd/yyyy");
    public int EventNumber { get; set; }
    public string IncidentDate { get; set; } = DateTime.Today.ToString("MM/dd/yyyy");
    }
}