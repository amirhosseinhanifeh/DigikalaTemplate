using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Menu;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers
{
    [Area("Admin")]

    public class MenuController : Controller
    {
        private readonly ServiceContext _context;
        public MenuController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return PartialView();
        }
    }
}
