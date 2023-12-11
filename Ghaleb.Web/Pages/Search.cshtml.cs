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
        public tbl_ProductCategory ProductCategory { get; set; }
        public List<tbl_ProductCategory> ProductCategories { get; set; } = new List<tbl_ProductCategory>();
        public List<tbl_Brands> Brands { get; set; } = new List<tbl_Brands>();
        public List<tbl_ProductCustomFields> ProductCustomFields { get; set; } = new List<tbl_ProductCustomFields>();
        public tbl_SubProductCategory SubProductCategory { get; set; }
        public tbl_ProductTags ProductTag { get; set; }


        [BindProperty(SupportsGet = true)]
        public long[] CategoryIds { get; set; }
        [BindProperty(SupportsGet = true)]
        public long[] BrandIds { get; set; }
        [BindProperty(SupportsGet = true)]
        public long[] OptionIds { get; set; }
        [BindProperty(SupportsGet = true)]
        public bool IsExists { get; set; } = false;
        public int TotalCount { get; set; }
        [BindProperty(SupportsGet = true)]
        public long? BrandId { get; set; }
        [BindProperty(SupportsGet = true)]
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 16;
        public Dictionary<string, string> Routes{ get; set; }

        public async Task<IActionResult> OnGetAsync(
            long? mainCategoryId = null,
            long? categoryId = null,
            long? subcategoryId = null,
            long? tagId = null,
            string? tagName = null,
            bool? myposts = null,
            string? q = null,
            string order = "NEW"
            )
        {
            if (BrandId != null)
            {
                Brand = await _context.tbl_Brands.Include(x => x.Logo).FirstOrDefaultAsync(x => x.Id == BrandId);
                ProductCategories = await _context.tbl_ProductCategories.ToListAsync();
            }
            if (categoryId != null)
            {
                ProductCategory = await _context.tbl_ProductCategories.FirstOrDefaultAsync(x => x.Id == categoryId);
                ProductCustomFields = await _context.tbl_ProductCustomFields.Where(x => x.ProductCategoryId == categoryId && x.FieldType == FieldType.DROPDOWN && x.ProductCustomFieldsOptionValues.Any()).Include(x => x.ProductCustomFieldsOptionValues).ToListAsync();
                Brands = await _context.tbl_Brands.Where(x => x.IsActive && x.IsDelete != true).ToListAsync();
            }
            if (subcategoryId != null)
            {
                SubProductCategory = await _context.tbl_SubProductCategories.FirstOrDefaultAsync(x => x.Id == subcategoryId);
                var s = await _context.tbl_ProductCustomFields.Where(x => x.SubProductCategoryId == subcategoryId && x.FieldType == FieldType.DROPDOWN && x.ProductCustomFieldsOptionValues.Any()).Include(x => x.ProductCustomFieldsOptionValues).ToListAsync();
                ProductCustomFields.AddRange(s);
                Brands = await _context.tbl_Brands.Where(x => x.IsActive && x.IsDelete != true).ToListAsync();
            }
            if (tagId != null)
            {
                ProductTag = await _context.tbl_ProductTags.FirstOrDefaultAsync(x=>x.Id==tagId && x.Name==tagName);
                if (ProductTag == null)
                    return Redirect("~/");
            }
            var res = _product.GetProductList(mainCategoryId, categoryId, subcategoryId, CategoryIds, BrandIds, tagId, OptionIds, q, order, PageNumber, PageSize, null, isExists:IsExists).model;
            TotalCount = await res.CountAsync();
            Routes = RouteBuiler(BrandId, categoryId,subcategoryId, BrandIds, CategoryIds, OptionIds, IsExists);
            Products = await _product.GetProductList(mainCategoryId, categoryId, subcategoryId, CategoryIds, BrandIds, tagId, OptionIds, q, order, PageNumber, PageSize, null, isExists: IsExists).model.Skip((PageNumber - 1) * PageSize).Take(PageSize).ToListAsync();

            return Page();
        }
        public Dictionary<string, string> RouteBuiler(long? brandId,long? categoryId,long? subcategoryId, long[] brandIds, long[] categoryIds, long[] optionIds, bool isExists)
        {
            var routes = new Dictionary<string, string>();
            routes.Add("brandId", brandId.ToString());
            routes.Add("categoryId", categoryId.ToString());
            routes.Add("subcategoryId", subcategoryId.ToString());
            routes.Add("isExists", isExists.ToString());
            for (int i = 0; i < brandIds.Length; i++)
            {
                routes.Add("brandIds[" + i + "]", brandIds[i].ToString());
            }
            for (int i = 0; i < categoryIds.Length; i++)
            {
                routes.Add("categoryIds[" + i + "]", categoryIds[i].ToString());
            }
            for (int i = 0; i < optionIds.Length; i++)
            {
                routes.Add("optionIds[" + i + "]", optionIds[i].ToString());
            }
            return routes;
        }
    }
}
