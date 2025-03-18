using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class DbInitializer
{
  //  public static async Task SeedData(AppDbContext context, UserManager<Member> userManager)
    public static async Task SeedData(AppDbContext context, UserManager<Member> userManager)
    {
        if (!userManager.Users.Any()) // Ensure users are not already seeded
        {
            Member member = new Member
            {
                UserName = "john_doe",
                Email = "john.doe@example.com",
                PhoneNumber = "123-456-7890",
                FirstName = "John",
                LastName = "Doe",
                IsMember = true
            };

            Member member1 = new Member
            {
                UserName = "tom_smith",
                Email = "tomSmith@example.com",
                PhoneNumber = "470-980-2045",
                FirstName = "Tom",
                LastName = "Smith",
                IsMember = true
            };

            await userManager.CreateAsync(member, "Password123!");  // Use Identity to create users
            await userManager.CreateAsync(member1, "Password123!");

            // Add Related Data Only If Not Exists
            if (!context.Payments.Any())
            {
                var payments = new List<Payment>
                {
                    new Payment
                    {
                        PaymentDate = new DateTime(2021, 1, 1),
                        PaymentAmount = 50.00,
                        PaymentType = PaymentType.CreditCard,
                        PaymentRecurringType = PaymentRecurringType.Annual,
                        MemberId = member.Id
                    },
                    new Payment
                    {
                        PaymentDate = new DateTime(2021, 1, 1),
                        PaymentAmount = 20.00,
                        PaymentType = PaymentType.CreditCard,
                        PaymentRecurringType = PaymentRecurringType.Monthly,
                        MemberId = member.Id,

                    }
                };

                await context.Payments.AddRangeAsync(payments);
            }

            if (!context.Addresses.Any())
            {
                var addresses = new List<Address>
                {
                    new Address { Street = "123 Main St", City = "New York", State = "NY", ZipCode = "10001",  MemberId = member.Id },
                    new Address { Street = "456 Elm St", City = "Los Angeles", State = "CA", ZipCode = "90001",  MemberId = member.Id }
                };

                await context.Addresses.AddRangeAsync(addresses);
            }

            if (!context.FamilyMembers.Any())
            {
                var familyMembers = new List<FamilyMember>
                {
                    new FamilyMember { FirstName = "Jane", LastName = "Doe",  MemberId = member.Id },
                    new FamilyMember { FirstName = "Sara", LastName = "Doe", MemberId = member.Id }
                };

                await context.FamilyMembers.AddRangeAsync(familyMembers);
            }

            if (!context.MemberFiles.Any())
            {
                var memberFiles = new List<MemberFile>
                {
                    new MemberFile { FileName = "Profile.jpg", FilePath = "C:/Users/ghail/OneDrive/Documents/payment_instructions.pdf", MemberId = member.Id },
                    new MemberFile { FileName = "Profile.jpg", FilePath = "C:/Users/ghail/OneDrive/Pictures/TGojo.png",  MemberId = member.Id }
                };

                await context.MemberFiles.AddRangeAsync(memberFiles);
            }

            if (!context.Incidents.Any())    
            {
                var incidents = new List<Incident> 
                {
                    new Incident { EventNumber = 1, IncidentDescription = "Death", IncidentType = IncidentType.NaturalDeath, MemberId = member.Id },
                    new Incident { EventNumber = 2, IncidentDescription = "Death", IncidentType = IncidentType.NaturalDeath, MemberId = member.Id }
                };

                await context.Incidents.AddRangeAsync(incidents);
            }
        

            await context.SaveChangesAsync();
        }
    }
}

}
