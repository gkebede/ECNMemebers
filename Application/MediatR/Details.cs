using Application.Dtos;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.MediatR
{
    public class Details
    {

       
        public class Query : IRequest<Result<MemberDto>>
        {
             public string? Id { get; set; }
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
            var member = await _context.Members
               //ProjectTo  === using AutoMapper.QueryableExtensions;
               .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
               .FirstOrDefaultAsync(m => m.Id == request.Id);
            if (member == null) return Result<MemberDto>.Failure("No member found");
               return Result<MemberDto>.Success(member);
        }
    }
    }
}