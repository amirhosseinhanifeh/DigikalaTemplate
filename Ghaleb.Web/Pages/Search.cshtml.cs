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
        public List<tbl_ProductCategory> ProductCategories { get; set; }=new List<tbl_ProductCategory>();
        public List<tbl_Brands> Brands { get; set; } = new List<tbl_Brands>();
        public List<tbl_ProductCustomFields> ProductCustomFields { get; set; } = new List<tbl_ProductCustomFields>();
        public tbl_SubProductCategory SubProductCategory { get; set; }
        public tbl_ProductTags ProductTag { get; set; }
        public long[] CategoryIds { get; set; }
        public long[] BrandIds { get; set; }
        public long[] OptionIds { get; set; }
        public bool IsExists { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }

        public async Task OnGetAsync(
            long? mainCategoryId = null,
            long? brandId = null,
            long? tagId=null,
            long? categoryId = null,
        long[] categoryIds = null,
        long? subcategoryId = null,
        long[] brandIds = null,
        long[] optionIds = null,
            bool? myposts = null,
            string q = null,
            string order = "NEW",
            bool? isExists=null,
            int pageNumber = 1,
            int pageSize = 16
            
            )
        {
            if (brandId != null)
            {
                Brand = await _context.tbl_Brands.Include(x => x.Logo).FirstOrDefaultAsync(x => x.Id == brandId);
                ProductCategories = await _context.tbl_ProductCategories.ToListAsync();
            }
            if (categoryId != null)
            {
                ProductCategory = await _context.tbl_ProductCategories.FirstOrDefaultAsync(x => x.Id == categoryId);
                ProductCustomFields = await _context.tbl_ProductCustomFields.Where(x => x.ProductCategoryId == categoryId && x.FieldType == FieldType.DROPDOWN && x.ProductCustomFieldsOptionValues.Any()).Include(x => x.ProductCustomFieldsOptionValues).ToListAsync();
                Brands = await _context.tbl_Brands.Where(x=>x.IsActive && x.IsDelete !=true).ToListAsync();
            }
            if (subcategoryId != null)
            {
                SubProductCategory = await _context.tbl_SubProductCategories.FirstOrDefaultAsync(x => x.Id == subcategoryId);
                ProductCustomFields = await _context.tbl_ProductCustomFields.Where(x => x.SubProductCategoryId == subcategoryId && x.FieldType == FieldType.DROPDOWN && x.ProductCustomFieldsOptionValues.Any()).Include(x => x.ProductCustomFieldsOptionValues).ToListAsync();
                Brands = await _context.tbl_Brands.Where(x => x.IsActive && x.IsDelete != true).ToListAsync();
            }
            if(tagId !=null)
            {
                ProductTag = await _context.tbl_ProductTags.FindAsync(tagId);
            }
            CategoryIds = categoryIds;
            BrandIds = brandIds;
            OptionIds = optionIds;
            IsExists = isExists==true?true:false;
            var userId = myposts == true ? User.Identity.Name.Tolong() : null;
            var res = _product.GetProductList(mainCategoryId, categoryIds, subcategoryId, brandIds,tagId, optionIds, q, order, pageNumber, pageSize, userId,isExists).model;
            TotalCount = await res.CountAsync();
            PageSize = pageSize;
            PageNumber = pageNumber;
            Products = await _product.GetProductList(mainCategoryId, categoryIds, subcategoryId, brandIds,tagId, optionIds, q, order, pageNumber, pageSize, userId,isExists).model.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }
    }
}
