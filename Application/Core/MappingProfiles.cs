using Application.Dtos;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Member <-> MemberDto
            CreateMap<Member, MemberDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive))
                .ForMember(dest => dest.IsAdmin, opt => opt.MapFrom(src => src.IsAdmin))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => $"{src.FirstName}_{src.LastName}"))
                .ForMember(dest => dest.RegisterDate, opt => opt.MapFrom(src => src.RegisterDate))
                .ForMember(dest => dest.Bio, opt => opt.MapFrom(src => $"Member since, {src.RegisterDate:MM/dd/yyyy}"))
                .ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore()); // Ignore ID during creation

            // Member -> MemberListDto
            CreateMap<Member, MemberListDto>();

            // Optional: Keep this for extra safety
            CreateMap<MemberDto, Member>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            // Navigation properties
            CreateMap<Payment, PaymentDto>()
            .ForMember(dest => dest.PaymentDate, opt => opt.MapFrom(src => $"{src.PaymentDate:MM/dd/yyyy}"))
            .ReverseMap();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<FamilyMember, FamilyMemberDto>().ReverseMap();
            CreateMap<MemberFile, MemberFileDto>().ReverseMap();
            CreateMap<Incident, IncidentDto>()
                .ForMember(dest => dest.IncidentDate, opt => opt.MapFrom(src => $"{src.IncidentDate:MM/dd/yyyy}"))
                .ReverseMap();
        }
    }
}
