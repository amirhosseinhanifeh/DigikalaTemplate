using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Menu;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Components
{
    public class MenuViewComponent: ViewComponent
    {
        private readonly ServiceContext _context;

        public MenuViewComponent(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View("~/Areas/Admin/Views/Menu/Index.cshtml", (await _context.GetAllAsync<tbl_Menu>(x => x.ParentId == null, includes: new string[] { "ChildMenus" }).OrderBy(x=>x.Order).ToListAsync()));
        }
    }
}
