using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

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
            return View(await _context.tbl_ProductPriceHistory.Include(x => x.Color).Where(x => x.ProductId == productId).OrderByDescending(x => x.Id).ToListAsync());
        }
        public async Task<IActionResult> Create(long productId)
        {
            ViewBag.ProductId = productId;
            ViewBag.Colors = new SelectList(await _context.tbl_Colors.ToListAsync(), "Id", "Name");
            ViewBag.Fields = await _context.tbl_ProductPriceOptions.Include(x => x.OptionValues).ToListAsync();
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(tbl_ProductPriceHistory model, long[] optionIds)
        {
            if (ModelState.IsValid)
            {
                model.ProductPriceOptionValues = new List<tbl_ProductPriceOptionValue>();
                foreach (var item in optionIds)
                {
                    var option = await _context.tbl_ProductPriceOptionValues.FindAsync(item);
                    model.ProductPriceOptionValues.Add(option);
                }
                await _context.tbl_ProductPriceHistory.AddAsync(model);
                await _context.SaveChangesAsync();
                return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType.success });
            }
            return Json(new { message = "خطا", Status = Status.Failed, NotificationType.error });

        }
    }
}
