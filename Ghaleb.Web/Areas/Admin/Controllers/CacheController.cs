using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Cache;
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

        public async Task<IActionResult> Create(long? Id)
        {
            return View(await _serviceContext.tbl_Caches.FirstOrDefaultAsync(x => x.Id == Id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(long? Id, tbl_Cache model)
        {
            var role = await _serviceContext.tbl_Caches.FirstOrDefaultAsync(x => x.Id == Id);
            if (role == null)
            {
                await _serviceContext.tbl_Caches.AddAsync(model);

            }
            else
            {
                role.CacheName = model.CacheName;
                role.ModifiedDate = DateTime.UtcNow;
                role.IsActive = model.IsActive;

            }
            await _serviceContext.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> RemoveAsync(string cacheName)
        {
            _memoryCache.Remove(cacheName);
            var role = await _serviceContext.tbl_Caches.FirstOrDefaultAsync(x => x.CacheName == cacheName);
            role.ModifiedDate = DateTime.Now;
            await _serviceContext.SaveChangesAsync();

            return RedirectToAction("Index");
        }
    }
}
