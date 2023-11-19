using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Areas.Admin.Controllers
{
    public class CacheController : Controller
    {
        private readonly IMemoryCache _memoryCache;

        public CacheController(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }
        public IActionResult Index(string cacheName)
        {
            _memoryCache.Remove(cacheName);
            return View();
        }
    }
}
