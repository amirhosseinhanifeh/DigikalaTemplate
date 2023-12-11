using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Collections;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Ghaleb.Web.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class CacheController : Controller
    {
        private readonly IMemoryCache _memoryCache;
        private readonly ServiceContext _serviceContext;

        public CacheController(IMemoryCache memoryCache, ServiceContext serviceContext)
        {
            _memoryCache = memoryCache;
            _serviceContext = serviceContext;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {

            return View(await _serviceContext.tbl_Caches.AsNoTracking().ToListAsync());
        }
        public IActionResult Remove(string cacheName)
        {
            _memoryCache.Remove(cacheName);
            return View();
        }
    }
}
