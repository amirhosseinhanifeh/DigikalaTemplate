using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.TopMenu
{
    public class LinkManagementViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration configuration;
        public LinkManagementViewComponent(ServiceContext context, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _context = context;
            _memoryCache = memoryCache;
            this.configuration = configuration;
        }

        public async Task<IViewComponentResult> InvokeAsync(string routeName, string viewName)
        {
            var res = await _memoryCache.GetOrCreateAsync("LinkManagement_" + routeName, async cachEntry =>
            {
                return await _context.tbl_LinkManagements.Include(x => x.Image).Where(x => x.IsActive && x.IsDelete != true && x.GroupLinkManagement.RouteName == routeName).ToListAsync();
            });
            return View(viewName, res);
        }
    }
}
