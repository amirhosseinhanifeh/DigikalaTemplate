using ALO.DomainClasses.Entity.PFL;
using ALO.ViewModels.Account;
using ALO.ViewModels.Profile;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Profile
{
    public interface IProfileService
    {

        Task<ResultViewModel> CreateAsync(long Id,RegisterViewModel model);
        Task<ResultViewModel> UpdateAsync(long Id, RequestForUpdateProfileDTO model);
        Task<ListResultViewModel<GetUserProfileDetailDTO>> GetAsync(long Id);

    }
}
