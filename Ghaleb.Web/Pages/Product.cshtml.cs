
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product;
using ALO.ViewModels.Result;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    [IgnoreAntiforgeryToken]
    public class ProductModel : PageModel
    {
        private readonly IProductService _product;
        private readonly ServiceContext _context;
        public ProductModel(IProductService product, ServiceContext context)
        {
            _product = product;
            _context = context;
        }
        public ProductDetailsForHomeDto Product { get; set; }
        public long? Color { get; set; }
        public List<ProductListForHomeDto> RelatedProducts { get; set; }
        public async Task OnGetAsync(long id,long? color=null)
        {
            //if (User.Identity.IsAuthenticated)
            //{
            //    result = await _product.GetProductDetails(id, User.Identity.Name.Tolong());
            //    if (result.model != null)
            //    {
            //        await _product.AddProductVisit(result.model.Id, User.UserId());
            //    }
            //}
            //else
            //{
            Product = (await _product.GetProductDetails(id)).model;
            if (color == null)
            {
                Color = Product.Colors.First().Id;
            }
            else
            {
                Color = color;
            }
            RelatedProducts = await _context.tbl_Products.Where(h => h.IsDelete == false && h.IsActive == true && h.Id !=id && h.ProductCategory.Id==Product.Category.Id && h.BrandId==Product.Brand.Id).Select(y => new ProductListForHomeDto
            {
                Id = y.Id,
                Abstract = y.Abstract,
                Discount = y.GetDiscountPrice() != null ? y.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
                Cost = y.GetLastPrice().ToString("n0").toPersianNumber(),
                Image = y.Image.BindImage(),
                IsSpecial = y.IsSpecial,
                Title = y.Title,
                Url = y.Url,
                Call = y.GetLastPrice() == 0
            }).ToListAsync();
        }
    }
}
