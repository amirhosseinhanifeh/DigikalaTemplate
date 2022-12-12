using ALO.ViewModels.PageContent;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.PageContent
{
    public interface ISocialNetworkService
    {
        Task<ListResultViewModel<GetInfoTopHeaderForWebsiteDTO>> Get();
    }
}
