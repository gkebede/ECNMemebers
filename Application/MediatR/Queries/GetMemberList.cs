using MediatR;
using Application.Core;
using Application.Dtos;
using Persistence;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;

namespace Application.MediatR
{
    public class GetMemberList
    {
        public class Query : IRequest<Result<List<MemberDto>>>
        {
            // Add the missing type definition
        }
    public class Handler : IRequestHandler<Query, Result<List<MemberDto>>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public Handler(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<Result<List<MemberDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var id = string.Empty;
          var members = await _context.Members
               //ProjectTo  === using AutoMapper.QueryableExtensions; //! this work as the same as .ProjectTo<>
               .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
               .ToListAsync(cancellationToken);
              
               return Result<List<MemberDto>>.Success(members);
        }
    }
    }
}