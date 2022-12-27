using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.SocialNetworks
{
    public class SocialNetworksViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        public SocialNetworksViewComponent(ServiceContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var res = await _memoryCache.GetOrCreateAsync("SocialNetworks", async cachEntry =>
            {

               return await _context.tbl_SocialNetworks.Where(x => x.IsActive && x.IsDelete != true ).ToListAsync();
            });
            return View(res);
        }
    }
}
