 

namespace Domain
{
    public class MemberFile
{
    public Guid Id { get; set; }

    public string FileName { get; set; } = null!;
    public string FileDescription { get; set; } = null!;
    public string FilePath { get; set; } = null!;

    public string? ContentType { get; set; }
    public byte[]? Data { get; set; }

    // 👇 Foreign Key
    public Guid MemberId { get; set; }

    // 👇 Navigation Property (optional but useful)
    public Member Member { get; set; } = null!;
}

}



  
  

