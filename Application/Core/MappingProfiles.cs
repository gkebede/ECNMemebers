using Application.Dtos;
using AutoMapper;
using Domain;
namespace Application.Core
{

  // todo   *** CreateMap<Member, MemberDto>().ReverseMap()   ==>   for update delete, and create...
  //! (Member → MemberDto and MemberDto → Member)   i.e ~~ var member = _mapper.Map<Member>(memberDto);
  // todo   *** CreateMap<Member, MemberDto>()     for just reading Member/s
  //!  one-way mapping from Member to MemberDto.`    i.e ~~ var memberDto = _mapper.Map<MemberDto>(member);
  public class MappingProfiles : Profile
  {
    //public IMapper _mapper;

    // Removed the empty constructor declaration as it is unnecessary
    public MappingProfiles()
    {
      //  _mapper = mapper;

      CreateMap<Member, MemberDto>()
     .ForMember(dest => dest.Id, opt => opt.MapFrom(o => o.Id))
     .ForMember(dest => dest.IsActive, opt => opt.MapFrom(o => o.IsActive))
     .ForMember(dest => dest.IsAdmin, opt => opt.MapFrom(o => o.IsAdmin))
     .ForMember(dest => dest.UserName, o => o.MapFrom(s => $"{s.FirstName}_{s.LastName}"))
     .ForMember(dest => dest.Bio, o => o.MapFrom(s => $"Member since, {s.RegisterDate:MM/dd/yyyy}"))
     .ReverseMap()
     .ForMember(dest => dest.Id, opt => opt.Ignore());

      //! Other Mappings (Ignore Id for creation, keep for retrieval for all of the navg. props)
      // Id is ignored during creation to ensure server-side assignment


      CreateMap<Payment, PaymentDto>().ReverseMap();
      CreateMap<Address, AddressDto>().ReverseMap();
      CreateMap<FamilyMember, FamilyMemberDto>().ReverseMap();
      CreateMap<MemberFile, MemberFileDto>().ReverseMap();
      CreateMap<Incident, IncidentDto>().ReverseMap();

      // Ensure null values in DTOs don't overwrite existing values in entities
      CreateMap<MemberDto, Member>()
          .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));



      //! I was ignoring Id like the ff to all navigatinal list propeerties but...
      //   CreateMap<Payment, PaymentDto>().ReverseMap()
      //  .ForMember(dest => dest.Id, opt => opt.Ignore());
      //!... but since Since UpdateNavigationEntities in Update class handles entity updates correctly, there's no need to ignore Id.
    }

  }

}







