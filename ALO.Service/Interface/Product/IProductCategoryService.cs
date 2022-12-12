using ALO.DomainClasses.Entity.Product;
using ALO.ViewModels.Product;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Product
{
    public interface IProductCategoryService
    {
        Task<ListResultViewModel<IEnumerable<CategoryForSiteHeaderDto>>> GetCategoryForSiteHeader();
        Task<ListResultViewModel<GetCategoryDetailForWebsiteDTO>> GetProductCategoryForWebsite(string url);
        Task<ListResultViewModel<IEnumerable<DropDownListDTO>>> GetProductCategoriesSelect(long? mainCategoryId=null);
        Task<ListResultViewModel<IEnumerable<ProductCustomFields>>> GetFields(long subcategoryId);
    }
}
