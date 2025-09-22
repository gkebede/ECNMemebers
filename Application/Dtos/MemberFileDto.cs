using Microsoft.AspNetCore.Http;

namespace Application.Dtos
{
    public class MemberFileDto
    {

 
        public IFormFile? File { get; set; }
    // other properties...
 
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? FileName { get; set; }
        public string FilePath { get; set; } = null!;
        public string? FileDescription { get; set; }
        public string? ContentType { get; set; }
        public byte[]? Data { get; set; }
    }
}

 

