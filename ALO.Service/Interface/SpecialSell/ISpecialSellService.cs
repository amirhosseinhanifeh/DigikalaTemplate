using ALO.ViewModels.Result;
using ALO.ViewModels.SpecialSell;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.SpecialSell
{
    public interface ISpecialSellService
    {
        Task<ListResultViewModel<GetSpecialSellForHomeDto>> GetRandomSpecialSell();
    }
}
