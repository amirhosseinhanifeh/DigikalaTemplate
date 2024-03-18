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
            var result =await _context.tbl_Orders
                .Include(x=>x.OrderDetails)
                .ThenInclude(x=>x.ProductPriceHistory)
                .ThenInclude(x=>x.Product)
                .Include(x=>x.UserAddress)
                .ThenInclude(x=>x.User)
                .ThenInclude(x=>x.Profile)
                .FirstOrDefaultAsync(x => x.Id == Id);
            return View(result);
        }
        [HttpPost]
        public async Task<IActionResult> Details(long? Id, OrderState state)
        {
            var result = await _context.tbl_Orders
                .Include(x=>x.OrderStateHistories)
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.ProductPriceHistory)
                .ThenInclude(x => x.Product)
                .Include(x => x.UserAddress)
                .ThenInclude(x => x.User)
                .ThenInclude(x => x.Profile)
                .FirstOrDefaultAsync(x => x.Id == Id);
            if(!result.OrderStateHistories.Any(x=>x.OrderState==state))
            {
                result.OrderStateHistories.Add(new tbl_OrderStateHistory
                {
                    OrderState = state
                });
                await _context.SaveChangesAsync();
                ViewBag.Message = "وضعیت تغییر کرد";
            }
            else
            {
            ViewBag.Message = "قبلا این وضعیت انتخاب شده";

            }
            return View(result);
        }
        public async Task<IActionResult> UserDetail(long addressId)
        {
            return View(await _context.tbl_UserAddresses.Include(x => x.User).ThenInclude(x => x.Profile).FirstOrDefaultAsync(x => x.Id == addressId));
        }
    }
}
