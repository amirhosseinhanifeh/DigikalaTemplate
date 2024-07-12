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

    public class ProductCategoryController : Controller
    {
        private readonly ServiceContext _context;
        public ProductCategoryController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long? mainId)
        {
            return View(await _context.GetAllAsync<tbl_ProductCategory>(x => mainId != null ? x.MainProuctCategoryId == mainId : true, includes: new string[] { "SubProductCategories", "Products" }).ToListAsync());
        }
        public async Task<IActionResult> Create()
        {
            ViewBag.Categories = new SelectList((await _context.GetAllAsync<tbl_MainProductCategory>(x => x.IsDelete == false).ToListAsync()), "Id", "Name");
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(tbl_ProductCategory model)
        {
            if (ModelState.IsValid)
            {
                await _context.tbl_ProductCategories.AddAsync(model);
                await _context.SaveChangesAsync();
            }
            return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
        }
    }
}
