using Domain;

namespace Persistence
{
    public class DbInitalizer
    {
        public static async Task SeedData(AppDbContext context)
        {
            if (!context.Members.Any())
            {
                Member member = new Member
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@example.com",
                    PhoneNumber = "123-456-7890",
                    IsMember = true,
                    Payments = new List<Payment>
                    {
                        new Payment
                        {
                            PaymentDate = new DateTime(2021, 1, 1),
                            PaymentAmount = 50.00,
                            PaymentType = PaymentType.CreditCard,
                            
                            PaymentRecurringType = PaymentRecurringType.Annual
                        },
                        new Payment
                        {
                            PaymentDate = new DateTime(2021, 1, 1),
                            PaymentAmount = 20.00,
                            PaymentType = PaymentType.CreditCard,
                            PaymentRecurringType = PaymentRecurringType.Monthly
                        }
                    },
                    Addresses = new List<Address>
                    {
                        new Address
                        {
                            Street = "123 Main St",
                            City = "New York",
                            State = "NY",
                            ZipCode = "10001"
                        }
                    },
                    Incidents = new List<Incident>
                    {
                        new Incident
                        {
                            IncidentDescription = "Natural Death",
                            IncidentDate = new DateTime(2020, 12, 7),
                            IncidentType = IncidentType.NaturalDeath
                        }
                    },
                    MemberFiles = new List<MemberFile>
                    {
                        new MemberFile
                        {
                            FileName = "document.pdf",
                            FileType = "pdf",
                            FilePath = "C:\\Uploads\\MemberId\\document.pdf",
                            UploadDate = new DateTime(2021, 1, 1),
                            FileDescription = "Membership Form1"

                        },
                       
                    },

                    FamilyMembers = new List<FamilyMember>
                    {
                        new FamilyMember
                        {
                            FirstName = "Jane",
                            MiddleName = "Doe",
                            LastName = "Smith"
                        }
                    }
                };

                Member member1 = new Member
                {
              
                    FirstName = "Tom",
                    LastName = "Smith",
                    Email = "tomSmith@example.com",
                    PhoneNumber = "470-980-2045",
                    IsMember = true,
                    Addresses = new List<Address>
                    {
                        new Address
                        {
                            Street = "456 Elm St",
                            City = "Los Angeles",
                            State = "CA",
                            ZipCode = "90001"
                        }
                    },
                    Incidents = new List<Incident>
                    {
                        new Incident
                        {
                            Id = "some-static-guid-8",
                            IncidentDescription = "Accidental Death",
                            IncidentDate = new DateTime(2027, 1, 1),
                            IncidentType = IncidentType.AccidentalDeath
                        }
                    },
                    MemberFiles = new List<MemberFile>
                    {
                        new MemberFile
                        {
                            FileName = "document.pdf",
                            FileType = "pdf",
                            FilePath = "C:\\Uploads\\MemberId\\document.pdf",
                            UploadDate = new DateTime(2021, 10, 9),
                              FileDescription = "Membership Form2"
                        }
                    },
                    FamilyMembers = new List<FamilyMember>
                    {
                        new FamilyMember
                        {
                            FirstName = "Tom",
                            MiddleName = "Sam",
                            LastName = "Smith"
                        }
                    }
                };

                List<Member> members = new List<Member> { member, member1 };
              
                await context.Members.AddRangeAsync(members);
                await context.SaveChangesAsync();
            }
        }
    }
}
