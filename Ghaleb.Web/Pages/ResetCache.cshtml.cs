using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages
{
    public class ResetCacheModel : PageModel
    {
        private readonly IMemoryCache _memoryCache;

        public ResetCacheModel(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public void OnGet(string cacheName)
        {
            _memoryCache.Remove(cacheName);
        }
    }
}
