using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Image;
using ALO.Service.Interface.PageContent;
using ALO.Service.Interface.Product;
using ALO.ViewModels.PageContent;
using ALO.ViewModels.Product;
using Ghaleb.API.Helpers;
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

        public IndexModel(ILogger<IndexModel> logger, IProductService product, ServiceContext context, ISeoService seoService)
        {
            _logger = logger;
            _product = product;
            _context = context;
            _seoService = seoService;
        }
        public IEnumerable<CategoryListForHomeDTO> CategoryProducts { get; set; }
        public List<ProductListForHomeDto> HasDiscounts { get; set; }
        public List<ALO.DomainClasses.Entity.Content.tbl_Blocks> Blocks { get; set; }
        public GetHomePageSeoDTO  Seo { get; set; }
        public List<tbl_SlideShow>  SlideShows { get; set; }
        public async Task OnGetAsync()
        {
            CategoryProducts = (await _product.GetHomeProductsByCategoryList()).model;
            HasDiscounts = await _context.tbl_Products.Where(h => h.IsDelete == false && h.IsActive == true && h.ProductPriceHistories.Any(g => g.DiscountPrice != null)).Select(h => new ProductListForHomeDto
            {
                Id = h.Id,
                Cost = h.GetLastPrice().ToString("n0").toPersianNumber(),
                Discount = h.GetDiscountPrice() != null ? h.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
                Image = h.Image.BindImage(),
                Title = h.Title,
                Percent = h.CalculatePercent(),
                Url = h.Url
            }).ToListAsync();

            object YourVisits = null;

            if (User.Identity.IsAuthenticated)
            {
                YourVisits = await _context.tbl_Products.Where(h => h.IsDelete == false && h.IsActive == true && h.ProductVisits.Any(g => g.UserId == User.UserId())).Select(h => new
                {
                    Id = h.Id,
                    Cost = h.GetLastPrice().ToString("n0").toPersianNumber(),
                    Discount = h.GetDiscountPrice() != null ? h.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
                    Image = h.Image.BindImage(),
                    Title = h.Title,
                    Url = h.Url,
                    Call = h.GetLastPrice() == 0
                }).ToListAsync();
            }
            var blogs = await _context.tbl_Blogs.Where(h => h.ShowInHome && h.IsActive && h.IsDelete != true).OrderByDescending(x => x.Id).Take(4).Select(h => new
            {
                Id = h.Id,
                Title = h.Title,
                h.Url,
                Image = h.Image.BindImage(),
                h.Visit,
                h.Abstract
            }).ToListAsync();
            SlideShows = await _context.tbl_SlideShows.Include(x => x.Image).Where(h => h.IsActive && h.IsDelete != true).OrderByDescending(x => x.Id).Take(4).ToListAsync();

            Blocks = await _context.tbl_Blocks.Include(x=>x.Image).Where(h => h.IsActive && h.IsDelete != true).OrderBy(x => x.Id).ToListAsync();

            var contactus = await _context.tbl_ContactUsDetails.Select(h => new
            {
                h.Lat,
                h.Lng,
                h.Mobile,
                h.Phone,
                h.Address,
                h.Email,
                h.Tel,

            }).FirstOrDefaultAsync();
            Seo =(await _seoService.Get()).model;
        }
    }
}