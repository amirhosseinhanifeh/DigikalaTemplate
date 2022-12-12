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

    public class OrderController : Controller
    {
        private readonly ServiceContext _context;
        public OrderController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_Order>(includes:new string[] { "OrderDetails"}).ToListAsync());
        }
        public async Task<IActionResult> Details(long? Id)
        {
            return View(await _context.GetAllAsync<tbl_OrderDetails>(x => x.OrderId == Id).ToListAsync());
        }
    }
}
