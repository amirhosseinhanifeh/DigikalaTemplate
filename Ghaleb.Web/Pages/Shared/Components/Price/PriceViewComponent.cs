using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.Price
{
    public class PriceViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        public PriceViewComponent(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync(long prId, long? colorId, long[] attrIds = null)
        {

            var data = await _context.tbl_ProductPriceHistory.AsNoTracking().Include(x => x.Product).Include(x => x.ProductGuarantee).Where(x => x.ProductId == prId && (attrIds.Any() ? x.ProductPriceOptionValues.Any(h => attrIds.Contains(h.Id)) : true) && (colorId != null ? x.ColorId == colorId : true)).FirstOrDefaultAsync();
            return View(data);
        }
    }
}
