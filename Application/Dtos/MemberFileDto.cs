namespace Application.Dtos
{
    public class MemberFileDto
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? FileName { get; set; }
        public string FilePath { get; set; } = null!;
        public string? FileDescription { get; set; }
    }
}