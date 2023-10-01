using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.Entity.Product;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Image;
using ALO.Service.Interface.PageContent;
using ALO.Service.Interface.Product;
using ALO.ViewModels.PageContent;
using ALO.ViewModels.Product;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly IProductService _product;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IImageService _imageService;
        private readonly ServiceContext _context;
        private readonly ISeoService _seoService;
        private readonly IConfiguration _configuration;
        public IndexModel(ILogger<IndexModel> logger, IProductService product, ServiceContext context, ISeoService seoService, IConfiguration configuration)
        {
            _logger = logger;
            _product = product;
            _context = context;
            _seoService = seoService;
            _configuration = configuration;
        }
        public IEnumerable<CategoryListForHomeDTO> SubCategoryProducts { get; set; }
        public IEnumerable<CategoryListForHomeDTO> CategoryProducts { get; set; }
        public List<ProductListForHomeDto> NewProducts { get; set; }
        public List<ProductListForHomeDto> YourVisits { get; set; }
        public List<ProductListForHomeDto> MoreSell { get; set; }
        public List<ALO.DomainClasses.Entity.Content.tbl_Blocks> Blocks { get; set; }
        public GetHomePageSeoDTO Seo { get; set; }
        public async Task OnGetAsync()
        {
            //SubCategoryProducts = (await _product.GetHomeProductsByCategoryList()).model;
            //CategoryProducts = (await _context.GetAllAsync<tbl_ProductCategory>(x => x.ShowInHome == true, new string[] { "Products", "Products.Image", "Products.ProductPriceHistories" }).ToListAsync())
            //        .Select(x => new CategoryListForHomeDTO
            //        {
            //            Title = x.Title,
            //            Id = x.Id,
            //            Products = x.Products.Where(x => x.IsActive == true && x.IsDelete == false).OrderByDescending(x => x.Id).Take(10).Select(y => new ProductListForHomeDto
            //            {
            //                Id = y.Id,
            //                Abstract = y.Abstract,
            //                Discount = y.GetDiscountPrice() != null ? y.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
            //                Cost = y.GetLastPrice().ToString("n0").toPersianNumber(),
            //                Image = y.Image.BindImage(_configuration),
            //                IsSpecial = y.IsSpecial,
            //                Title = y.Title,
            //                Url = y.Url,
            //                Call = y.GetLastPrice() == 0

            //            }).ToList(),

            //            Url = x.Url

            //        }).ToList(); ;
            NewProducts = await _context.tbl_Products.Include(x=>x.ProductPriceHistories).Include(x=>x.Ratings).Where(h => h.IsDelete == false && h.IsActive == true).OrderByDescending(x=>x.Id).Take(10).Select(h => new ProductListForHomeDto
            {
                Id = h.Id,
                Cost = h.GetLastPrice().ToString("n0").toPersianNumber(),
                Discount = h.GetDiscountPrice() != null ? h.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
                Image = h.Image.BindImage(_configuration),
                Title = h.Title,
                Percent = h.CalculatePercent(),
                Url = h.Url,
                Ratings=h.Ratings.ToList()
            }).ToListAsync();

            //MoreSell = await _context.tbl_ProductPriceHistory.Where(h => h.IsDelete == false && h.IsActive == true && h.Product.IsActive && h.OrderDetails.Any(g => g.Order.OrderState == ALO.DomainClasses.Entity.Order.OrderState.PAYED)).OrderByDescending(x => x.OrderDetails.Count()).Select(h => new ProductListForHomeDto
            //{
            //    Id = h.Product.Id,
            //    Cost = h.Product.GetLastPrice().ToString("n0").toPersianNumber(),
            //    Discount = h.Product.GetDiscountPrice() != null ? h.Product.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
            //    Image = h.Product.Image.BindImage(_configuration),
            //    Title = h.Product.Title,
            //    Percent = h.Product.CalculatePercent(),
            //    Url = h.Product.Url
            //}).Take(10).ToListAsync();
            //if (User.Identity.IsAuthenticated)
            //{
            //    YourVisits = await _context.tbl_Products.Where(h => h.IsDelete == false && h.IsActive == true && h.ProductVisits.Any(g => g.UserId == User.UserId())).Select(y => new ProductListForHomeDto
            //    {
            //        Id = y.Id,
            //        Abstract = y.Abstract,
            //        Discount = y.GetDiscountPrice() != null ? y.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
            //        Cost = y.GetLastPrice().ToString("n0").toPersianNumber(),
            //        Image = y.Image.BindImage(_configuration),
            //        IsSpecial = y.IsSpecial,
            //        Title = y.Title,
            //        Url = y.Url,
            //        Call = y.GetLastPrice() == 0
            //    }).ToListAsync();
            //}

            Blocks = await _context.tbl_Blocks.AsNoTracking().Include(x => x.Image).Where(h => h.IsActive && h.IsDelete != true).OrderBy(x => x.Id).ToListAsync();

            Seo = (await _seoService.Get()).model;
        }
    }
}