using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Amazon.S3;
using Amazon.S3.Transfer;

namespace Domain
{
public class MemberFile
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string? FileDescription { get; set; }   // e.g., "Membership Form"

    public string? FileName { get; set; }  // e.g., "document.pdf"
    
    public string? FileType { get; set; }  // e.g., "pdf", "jpg"

    public string FilePath { get; set; } = null!;  // Stores location on C drive or url

    public DateTime UploadDate { get; set; } = DateTime.UtcNow;
   [Required]
    public string MemberId { get; set; } = null!;
        [JsonIgnore]
    public Member Member { get; set; } = null!;
}

}

