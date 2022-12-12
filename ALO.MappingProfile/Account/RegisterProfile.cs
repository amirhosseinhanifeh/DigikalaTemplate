using ALO.DomainClasses.Entity.Account;
using ALO.ViewModels.Account;
using AutoMapper;

namespace ALO.MappingProfile.Account
{
    public class RegisterProfile : Profile
    {
        public RegisterProfile()
        {
            CreateMap<RegisterViewModel, tbl_Users>();
        }
    }
}
