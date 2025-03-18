using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDbContext : IdentityDbContext<Member>
    {
         public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Member> Members { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<MemberFile> MemberFiles { get; set; }
    public DbSet<Incident> Incidents { get; set; }      
    public DbSet<Address> Addresses { get; set; }
    public DbSet<FamilyMember> FamilyMembers { get; set; }
protected override void OnModelCreating(ModelBuilder builder)
{
    base.OnModelCreating(builder);

    Console.WriteLine("🔹 OnModelCreating executed!"); // Debugging log

    // Define Relationships
    builder.Entity<Member>()
        .HasMany(m => m.FamilyMembers)
        .WithOne(fm => fm.Member)
        .HasForeignKey(fm => fm.MemberId)
        .OnDelete(DeleteBehavior.Cascade);

    builder.Entity<Member>()
        .HasMany(m => m.Incidents)
        .WithOne(i => i.Member)
        .HasForeignKey(i => i.MemberId)
        .OnDelete(DeleteBehavior.Cascade);

    builder.Entity<Member>()
        .HasMany(m => m.Payments)
        .WithOne(p => p.Member)
        .HasForeignKey(p => p.MemberId)
        .OnDelete(DeleteBehavior.Cascade);

    builder.Entity<Member>()
        .HasMany(m => m.MemberFiles)
        .WithOne(f => f.Member)
        .HasForeignKey(f => f.MemberId)
        .OnDelete(DeleteBehavior.Cascade);

    builder.Entity<Member>()
        .HasMany(m => m.Addresses)
        .WithOne(a => a.Member)
        .HasForeignKey(a => a.MemberId)
        .OnDelete(DeleteBehavior.Cascade);
}

    }
}