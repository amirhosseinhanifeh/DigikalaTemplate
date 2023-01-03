
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product;
using ALO.ViewModels.Result;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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
        [BindProperty(SupportsGet = true)]
        public long? Id { get; set; }
        [BindProperty(SupportsGet = true)]
        public long? Color { get; set; }
        [BindProperty(SupportsGet = true)]
        public long[] AttrIds { get; set; }
        public List<ProductListForHomeDto> RelatedProducts { get; set; }
        public async Task<IActionResult> OnGetAsync(long[] attrIds)
        {
            if (Id == null)
                return RedirectToPage("NotFound");

            if (User.Identity.IsAuthenticated)
            {
                Product = (await _product.GetProductDetails(Id.GetValueOrDefault(), User.UserId())).model;
                if (Product != null)
                {
                    await _product.AddProductVisit(Product.Id, User.UserId());
                }
            }
            else
            {
                Product = (await _product.GetProductDetails(Id.GetValueOrDefault())).model;
            }
            if (Product == null)
                return RedirectToPage("Error");

            if (!attrIds.Any())
            {
                AttrIds = Product.Options.Where(x=>x.Options.Any()).Select(h => h.Options.FirstOrDefault().Id).ToArray();
            }
            
            RelatedProducts = await _context.tbl_Products.Where(h => h.IsDelete == false && h.IsActive == true && h.Id != Id && h.ProductCategory.Id == Product.Category.Id && h.BrandId == Product.Brand.Id).Select(y => new ProductListForHomeDto
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

            return Page();
        }

        public async Task<IActionResult> OnPostAsync(tbl_ProductComment model)
        {
            if (User.Identity.IsAuthenticated)
            {
                model.UserId = User.UserId();
                model.IsActive = false;
                _context.tbl_ProductComments.Add(model);
                await _context.SaveChangesAsync();
            }
            return RedirectToPage("Product", new { id = model.ProductId });
        }
        public IActionResult OnPostAddToBasket()
        {
            var list = GetBasket();
            if (list == null)
            {
                list = new List<ResponseBasketDTO>();
            }
            var item = list.FirstOrDefault(x => x.Id == Id);
            if (item != null)
            {
                item.Count = item.Count + 1;
            }
            else
                list.Add(new ResponseBasketDTO
                {
                    Id = Id.Value,
                    Count = 1
                });
            var cookieOptions = new CookieOptions();
            Response.Cookies.Append("basket", JsonConvert.SerializeObject(list), cookieOptions);
            return RedirectToPage("/checkout/basket");
        }
        public List<ResponseBasketDTO> GetBasket()
        {
            var res = Request.Cookies["basket"];
            if (res != null)
            {
                return JsonConvert.DeserializeObject<List<ResponseBasketDTO>>(res);
            }
            return null;
        }
    }
    public class ResponseBasketDTO
    {
        public long Id { get; set; }
        public int Count { get; set; }
    }
}
