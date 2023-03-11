using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Clerk.Controllers.Orders
{
    [Area("Clerk")]
    [Authorize(Roles = "Clerk")]

    public class OrderController : Controller
    {
        private readonly ServiceContext _context;
        public OrderController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_Order>().Include(x=>x.OrderDetails).ThenInclude(x=>x.ProductPriceHistory).ToListAsync());
        }
        public async Task<IActionResult> Details(long? Id)
        {
            return View(await _context.GetAllAsync<tbl_OrderDetails>(x => x.OrderId == Id).Include(x=>x.ProductPriceHistory).ThenInclude(x=>x.Product).ToListAsync());
        }
        public async Task<IActionResult> UserDetail(long addressId)
        {
            return View(await _context.tbl_UserAddresses.Include(x=>x.User).ThenInclude(x=>x.Profile).FirstOrDefaultAsync(x=>x.Id==addressId));
        }
    }
}
