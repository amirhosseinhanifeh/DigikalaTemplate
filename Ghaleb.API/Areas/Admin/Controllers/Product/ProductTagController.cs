using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class ProductTagController : Controller
    {
        private readonly ServiceContext _context;
        public ProductTagController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long? productId)
        {
            ViewBag.Id = productId;
            return View(await _context.GetAllAsync<tbl_ProductTags>(x=>x.ProductId== productId).ToListAsync());
        }
        public async Task<IActionResult> Create(long productId)
        {
            ViewBag.Id = productId;
            return View(await _context.tbl_ProductTags.FindAsync(productId));
        }
        [HttpPost]
        public async Task<IActionResult> Create(tbl_ProductTags model)
        {

                if (model.Id == 0)
                {
                    await _context.tbl_ProductTags.AddAsync(model);
                }
                else
                {
                    _context.tbl_ProductTags.Update(model);

                }
                await _context.SaveChangesAsync();
            return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
        }
    }
}
