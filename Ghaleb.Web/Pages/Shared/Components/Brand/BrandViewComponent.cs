using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.Brand
{
    public class BrandViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        public BrandViewComponent(ServiceContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var res = await _context.tbl_Brands.Include(x => x.Logo).Where(x => x.IsDelete == false && x.IsActive).ToListAsync();

            return View(res);
        }
    }
}
