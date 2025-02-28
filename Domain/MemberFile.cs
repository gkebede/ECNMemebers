using Amazon.S3;
using Amazon.S3.Transfer;

namespace Domain
{
public class MemberFile
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string FileDescription { get; set; } = null!;  // e.g., "Membership Form"

    public string FileName { get; set; } = null!;  // e.g., "document.pdf"
    
    public string FileType { get; set; } = null!;  // e.g., "pdf", "jpg"

    public string FilePath { get; set; } = null!;  // Stores location on C drive or url

    public DateTime UploadDate { get; set; } = DateTime.UtcNow;

    public string MemberId { get; set; } = null!;
    public Member Member { get; set; } = null!;
}

}

