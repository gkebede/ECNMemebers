 


namespace Domain
{
    public class MemberFile
{
    public Guid Id { get; set; }
    public string? FileName { get; set; } = null!;//IFormFiel
    public string? FileDescription { get; set; } //IFormFiel
    public string? FilePath { get; set; }
    public string? ContentType { get; set; }  //IFormFiel
    
    public string MemberId { get; set; } = null!;

    public Member Member { get; set; } = null!;
}


}



  
  

