 


namespace Domain
{
    public class MemberFile
{
   public Guid Id { get; set; }
    // Original metadata
    public string? FileName { get; set; }
    public string? FileDescription { get; set; }
    public string? ContentType { get; set; }
    public string? FilePath { get; set; }

    // Store file bytes in DB
    public byte[]? Content { get; set; }

    // Link to member
    public string MemberId { get; set; } = null!;
    public Member Member { get; set; } = null!;
}


}



  
  

