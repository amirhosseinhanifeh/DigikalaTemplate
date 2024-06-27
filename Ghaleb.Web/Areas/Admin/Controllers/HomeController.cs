using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AyandeNama.Web.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class HomeController : Controller
    {
        private readonly ServiceContext _context;

        public HomeController(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.NewUsers = await _context.tbl_Users.AsNoTracking().Where(x => x.RegisteredDate.Date == DateTime.Now.Date).CountAsync();
            ViewBag.Sales = await _context.tbl_Orders.AsNoTracking().Where(x => x.CreatedDate.Date == DateTime.Now.Date && x.OrderStateHistories.Any(h => h.OrderState == ALO.DomainClasses.Entity.Order.OrderState.PAYED)).CountAsync();
            ViewBag.Comments = await _context.tbl_ProductComments.AsNoTracking().Where(x => x.CreatedDate.Date == DateTime.Now.Date).CountAsync();
            ViewBag.ContactsUs = await _context.tbl_FormContantUs.AsNoTracking().Where(x => x.CreatedDate.Date == DateTime.Now.Date).CountAsync();
            return View();
        }
    }
}
