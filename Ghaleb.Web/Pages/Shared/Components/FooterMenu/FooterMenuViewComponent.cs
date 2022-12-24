using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.FooterMenu
{
    public class FooterMenuViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        public FooterMenuViewComponent(ServiceContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IViewComponentResult> InvokeAsync(string routeName)
        {
            var res = await _memoryCache.GetOrCreateAsync("FooterLinks", async cachEntry =>
            {

               return await _context.tbl_LinkManagements.Where(x => x.IsActive && x.IsDelete != true && x.GroupLinkManagement.RouteName == routeName).ToListAsync();
            });
            return View(res);
        }
    }
}
