using Domain;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class MembersController : BaseApiController
    {
        private readonly AppDbContext _context;
        public MembersController(AppDbContext context)
        {
            _context = context;

        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers(int page = 1, int pageSize = 10)
        {
            var query = _context.Members
                .AsNoTracking()
                .Include(m => m.Addresses)
                .Include(m => m.FamilyMembers)
                .Include(m => m.MemberFiles)
                .Include(m => m.Payments)
                .Include(m => m.Incidents)
                .OrderBy(m => m.RegisterDate) // Example sorting
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            var members = await query.Select(m => new MemberDto
            {
                Id = m.Id,
                FirstName = m.FirstName,
                LastName = m.LastName,
                RegisterDate = m.RegisterDate,
                Addresses = m.Addresses,
                FamilyMembers = m.FamilyMembers,
                MemberFiles = m.MemberFiles.Select(f => new MemberFileDto
                {
                    FileName = f.FileName,
                    FilePath = f.FilePath,
                    FileDescription = f.FileDescription
                }).ToList(),
                Payments = m.Payments.Select(p => new PaymentDto
                {
                    PaymentAmount = p.PaymentAmount,
                    PaymentDate = p.PaymentDate,
                    PaymentType = p.PaymentType.ToString()
                }).ToList(),
                Incidents = m.Incidents.Select(i => new IncidentDto
                {
                    Id = i.Id,
                    IncidentDescription = i.IncidentDescription,
                    IncidentDate = i.IncidentDate
                }).ToList()
            }).ToListAsync();

            return Ok(members);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetMember(string id, bool includePayments = false, bool includeIncidents = false)
        {
            if (includePayments)
                _context.Members.Include(m => m.Payments);
            if (includeIncidents)
                _context.Members.Include(m => m.Incidents);

            var member = await _context.Members
                .AsNoTracking()
                .Include(m => m.Addresses)
                .Include(m => m.FamilyMembers)
                .Include(m => m.MemberFiles)
                .Include(m => m.Payments)
                .Include(m => m.Incidents)
                .Where(m => m.Id == id)
                .Select(m => new MemberDto
                {
                    Id = m.Id,
                    FirstName = m.FirstName,
                    LastName = m.LastName,
                    RegisterDate = m.RegisterDate,
                    Addresses = m.Addresses,
                    FamilyMembers = m.FamilyMembers,
                    MemberFiles = m.MemberFiles.Select(f => new MemberFileDto
                    {
                        FileName = f.FileName,
                        FilePath = f.FilePath,
                        FileDescription = f.FileDescription
                    }).ToList(),
                    Payments = m.Payments.Select(p => new PaymentDto
                    {
                        PaymentAmount = p.PaymentAmount,
                        PaymentDate = p.PaymentDate,
                        PaymentType = p.PaymentType.ToString()
                    }).ToList(),
                    Incidents = m.Incidents.Select(i => new IncidentDto
                    {
                        Id = i.Id,
                        IncidentType = i.IncidentType.ToString(),
                        IncidentDescription = i.IncidentDescription,
                        IncidentDate = i.IncidentDate
                    }).ToList()
                }).FirstOrDefaultAsync();




            if (member == null)
                return NotFound(new { message = "Member not found." });

            return Ok(member);
        }
    }
}
#region 
                        //     [HttpGet("{id}")]
                        //     public async Task<ActionResult<MemberDto>> GetMemberz(string id, bool includePayments = false, bool includeIncidents = false)
                        //     {
                        //         var query = _context.Members
                        //             .AsNoTracking()
                        //             .Include(m => m.Addresses)
                        //             .Include(m => m.FamilyMembers)
                        //             .Include(m => m.MemberFiles);

                        //         // Conditionally include Payments & Incidents
                        //         if (includePayments)
                        //               query.Include(m => m.Payments);

                        //         if (includeIncidents)
                        //             query.Include(m => m.Incidents);

                        //         var member = await query
                        //             .Where(m => m.Id == id)
                        //             .Select(m => new MemberDto
                        //             {
                        //                 Id = m.Id,
                        //                 FirstName = m.FirstName,
                        //                 LastName = m.LastName,
                        //                 RegisterDate = m.RegisterDate,
                        //                 Addresses = m.Addresses,
                        //                 FamilyMembers = m.FamilyMembers,
                        //                 MemberFiles = m.MemberFiles.Select(f => new MemberFileDto
                        //                 {
                        //                     FileName = f.FileName,
                        //                     FilePath = f.FilePath,
                        //                     FileDescription = f.FileDescription
                        //                 }).ToList(),
                        //                 Payments = includePayments ? m.Payments.Select(p => new PaymentDto
                        //                 {
                        //                     PaymentAmount = p.PaymentAmount,
                        //                     PaymentDate = p.PaymentDate,
                        //                     PaymentType = p.PaymentType.ToString()
                        //                 }).ToList() : null,
                        //                 Incidents = includeIncidents ? m.Incidents.Select(i => new IncidentDto
                        //                 {
                        //                     Id = i.Id,
                        //                     IncidentType = i.IncidentType.ToString(),
                        //                     IncidentDescription = i.IncidentDescription,
                        //                     IncidentDate = i.IncidentDate
                        //                 }).ToList() : null
                        //             })
                        //             .FirstOrDefaultAsync();

                        //         if (member == null)
                        //             return NotFound(new { message = "Member not found." });

                        //         return Ok(member);
                        //     }
                        // }
 #endregion