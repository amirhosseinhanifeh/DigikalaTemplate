using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Product
{
    public interface IProductSubCategoryService
    {
        Task<ListResultViewModel<IEnumerable<DropDownListDTO>>> GetSubCategorySelect(long? Id = null);
    }
}
