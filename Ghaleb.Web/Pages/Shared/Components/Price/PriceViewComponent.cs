using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.Price
{
    public class PriceViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration configuration;
        public PriceViewComponent(ServiceContext context, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _context = context;
            _memoryCache = memoryCache;
            this.configuration = configuration;
        }

        public async Task<IViewComponentResult> InvokeAsync(long prId, long? colorId, long[] attrIds=null)
        {

            var data = await _context.tbl_ProductPriceHistory.AsNoTracking().Include(x => x.Product).Include(x=>x.ProductGuarantee).Where(x => x.ProductId == prId && (attrIds.Any()?x.ProductPriceOptionValues.Any(h=>attrIds.Contains(h.Id)):true) && (colorId != null ? x.ColorId == colorId : true)).FirstOrDefaultAsync();
            return View(data);
        }
    }
}
