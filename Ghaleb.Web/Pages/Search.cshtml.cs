using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Ghaleb.Web.Pages
{
    public class SearchModel : PageModel
    {
        private readonly IProductService _product;
        private readonly ServiceContext _context;
        public SearchModel(IProductService product, ServiceContext context)
        {
            _product = product;
            _context = context;
        }
        public IEnumerable<ProductListForHomeDto> Products { get; set; }
        public tbl_Brands Brand { get; set; }
        public async Task OnGetAsync(
            long? mainCategoryId = null,
            long? brandId=null,
        string categoryIds = null,
        long? subcategoryId = null,
        string brandIds = null,
        string optionIds = null,
            bool? myposts = null,
            string q = null,
            string order = null,
            int page = 1,
            int pageSize = 10
            )
        {
            Brand = await _context.tbl_Brands.Include(x=>x.Logo).FirstOrDefaultAsync(x => x.Id == brandId);
            var userId = myposts == true ? User.Identity.Name.Tolong() : null;
            var brands = new long[] { };
            var categoryies = new long[] { };
            var options = new long[] { };
            if (brandIds != null)
            {
                brands = JsonConvert.DeserializeObject<long[]>(brandIds);
            }
            if (categoryIds != null)
            {
                categoryies = JsonConvert.DeserializeObject<long[]>(categoryIds);
            }
            if (optionIds != null)
            {
                options = JsonConvert.DeserializeObject<long[]>(optionIds);
            }
            Products = (await _product.GetProductList(mainCategoryId, categoryies, subcategoryId, brands, options, q, order, page, pageSize, userId)).model;
        }
    }
}
