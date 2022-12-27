using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.Blog
{
    public class BlogViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        public BlogViewComponent(ServiceContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var res = await _memoryCache.GetOrCreateAsync("Blogs", async cachEntry =>
            {

               return await _context.tbl_Blogs.Include(x => x.Image).Where(x => x.IsDelete == false && x.IsActive).OrderByDescending(x => x.Id).Take(4).ToListAsync();
            });
            return View(res);
        }
    }
}
