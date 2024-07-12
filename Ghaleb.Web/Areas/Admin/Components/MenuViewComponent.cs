using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Menu;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Components
{
    public class MenuViewComponent: ViewComponent
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        public MenuViewComponent(ServiceContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var res = await _memoryCache.GetOrCreateAsync("Menu", async cachEntry =>
            {

                return await _context.GetAllAsync<tbl_Menu>(x => x.ParentId == null, includes: new string[] { "ChildMenus" }).OrderBy(x => x.Order).ToListAsync();
            });
            return View("~/Areas/Admin/Views/Menu/Index.cshtml", res);
        }
    }
}
