using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.TopMenu
{
    public class TopMenuViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration  configuration;
        public TopMenuViewComponent(ServiceContext context, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _context = context;
            _memoryCache = memoryCache;
            this.configuration = configuration;
        }

        public async Task<IViewComponentResult> InvokeAsync(string routeName)
        {
            var res = await _memoryCache.GetOrCreateAsync("Links", async cachEntry =>
            {

               return await _context.tbl_LinkManagements.Where(x => x.IsActive && x.IsDelete != true && x.GroupLinkManagement.RouteName == routeName).ToListAsync();
            });
            ViewBag.Phone = (await _context.tbl_ContactUsDetails.FirstOrDefaultAsync()).Phone.ToString().toPersianNumber();
            ViewBag.Cat = configuration.GetSection("SiteSetting:CategoryName").Value;
            return View(res);
        }
    }
}
