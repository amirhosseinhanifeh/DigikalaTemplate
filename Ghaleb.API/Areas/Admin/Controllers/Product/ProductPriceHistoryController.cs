using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]
    public class ProductPriceHistoryController : Controller
    {
        private readonly ServiceContext _context;

        public ProductPriceHistoryController(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(long productId)
        {
            ViewBag.ProductId = productId;
            return View(await _context.tbl_ProductPriceHistory.Include(x=>x.Color).Where(x => x.ProductId == productId).OrderByDescending(x => x.Id).ToListAsync());
        }
        public async Task<IActionResult> Create(long productId)
        {
            ViewBag.ProductId = productId;
            ViewBag.Colors = new SelectList(await _context.tbl_Colors.ToListAsync(), "Id", "Name");

            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(tbl_ProductPriceHistory model)
        {
            if (ModelState.IsValid)
            {
                await _context.tbl_ProductPriceHistory.AddAsync(model);
                await _context.SaveChangesAsync();
                return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType.success });
            }
            return Json(new { message = "خطا", Status = Status.Failed, NotificationType.error });

        }
    }
}
