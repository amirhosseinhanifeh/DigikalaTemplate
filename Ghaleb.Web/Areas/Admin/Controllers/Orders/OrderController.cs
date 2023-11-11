using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Orders
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class OrderController : Controller
    {
        private readonly ServiceContext _context;
        public OrderController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long? userId)
        {
            return View(await _context.GetAllAsync<tbl_Order>().Include(x=>x.DeliveryPrice).Include(x=>x.OrderStateHistories).Include(x => x.OrderDetails).ThenInclude(x => x.ProductPriceHistory).Where(x => userId != null ? x.UserId == userId : true).Where(x => x.OrderStateHistories.Any(h => h.OrderState == OrderState.PAYED)).ToListAsync());
        }
        public async Task<IActionResult> Details(long? Id)
        {
            return View(await _context.GetAllAsync<tbl_OrderDetails>(x => x.OrderId == Id).Include(x => x.ProductPriceHistory).ThenInclude(x => x.Product).ToListAsync());
        }
        public async Task<IActionResult> UserDetail(long addressId)
        {
            return View(await _context.tbl_UserAddresses.Include(x => x.User).ThenInclude(x => x.Profile).FirstOrDefaultAsync(x => x.Id == addressId));
        }
    }
}
