using Application.Dtos;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.MediatR
{
    public class MemberDetails
    {


        public class Query : IRequest<Result<MemberDto>>
        {
            public required Guid Id { get; set; }
            // Add the missing type definition
        }
        public class Handler : IRequestHandler<Query, Result<MemberDto>>
        {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;
            public Handler(AppDbContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<MemberDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                 //todo the ff 2-mappings are identical  
                //1-a  var memberDto = _mapper.Map<MemberDto>(member); //  Map AFTER fetching
                //1-b .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                var member = await _context.Members
                .Include(m => m.Addresses)
                .Include(m => m.FamilyMembers)
                .Include(m => m.MemberFiles)
                .Include(m => m.Payments)
                .Include(m => m.Incidents)
                .AsSplitQuery()
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)  //Map AFTER fetching
                .FirstOrDefaultAsync(m => m.Id == request.Id.ToString()); //  Filter BEFORE projection

                if (member == null)
                    return Result<MemberDto>.Failure($"No member found with Id: {request.Id}");

              

                return Result<MemberDto>.Success(member);

            }
        }
    }
}