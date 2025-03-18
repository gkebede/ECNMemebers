using Application.Dtos;
using AutoMapper;
using Domain;
namespace Application.Core
{




    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Member, Member>().ReverseMap();
            CreateMap<Member, MemberDto>().ReverseMap()
           .ForMember(dest => dest.Id, opt => opt.Ignore()); // Ignore during creation of the Member object
            CreateMap<Payment, PaymentDto>().ReverseMap();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<FamilyMember, FamilyMemberDto>().ReverseMap();
            CreateMap<MemberFile, MemberFileDto>().ReverseMap();
            CreateMap<Incident, IncidentDto>().ReverseMap();
        }
    }
}

