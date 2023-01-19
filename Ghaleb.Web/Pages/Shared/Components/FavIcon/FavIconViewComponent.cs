using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.FavIcon
{
    public class FavIconViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration  configuration;
        public FavIconViewComponent(ServiceContext context, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _context = context;
            _memoryCache = memoryCache;
            this.configuration = configuration;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var res = await _memoryCache.GetOrCreateAsync("favIcon", async cachEntry =>
            {

               return (await _context.tbl_Seos.FirstOrDefaultAsync())?.FavIcon?.BindImage(configuration);
            });
            ViewBag.Url = res;
            return View();
        }
    }
}
