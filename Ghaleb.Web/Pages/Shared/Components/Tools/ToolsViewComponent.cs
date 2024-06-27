using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.Tools
{
    public class ToolsViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration configuration;
        public ToolsViewComponent(ServiceContext context, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _context = context;
            _memoryCache = memoryCache;
            this.configuration = configuration;
        }

        public async Task<IViewComponentResult> InvokeAsync(string type)
        {
            var res = await _memoryCache.GetOrCreateAsync("Tools_" + type, async cachEntry =>
            {

                return await _context.tbl_Tools.Where(x => x.IsActive && x.IsDelete != true && x.Type == type).ToListAsync();
            });
            return View(res);
        }
    }
}
