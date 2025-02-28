namespace API.DTO
{
    public class MemberFileDto
    {
        public string Id { get; set; } = null!;
        public string FileName { get; set; } = null!;
        public string FilePath { get; set; } = null!;
        public string FileDescription { get; set; } = null!;
    }
}