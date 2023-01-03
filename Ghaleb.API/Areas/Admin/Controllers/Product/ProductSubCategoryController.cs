using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.Service.Interface.Product;
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

    public class ProductSubCategoryController : Controller
    {
        private readonly IProductSubCategoryService _productSubCategoryService;
        private readonly ServiceContext _context;

        public ProductSubCategoryController(IProductSubCategoryService productSubCategoryService,
            ServiceContext context)
        {
            _productSubCategoryService = productSubCategoryService;
            _context = context;
        }

        public async Task<IActionResult> Index(long? productcategoryId=null)
        {
            return View(await _context.GetAllAsync<tbl_SubProductCategory>(x=>(productcategoryId!=null? x.ProductCategoryId==productcategoryId:true)&& x.IsDelete == false, includes:new string[] { "ProductCategory","Products" }).ToListAsync());
        }
        public async Task<IActionResult> Create()
        {
            ViewBag.Categories = new SelectList((await _context.GetAllAsync<tbl_ProductCategory>(x => x.IsDelete == false).ToListAsync()), "Id", "Title");
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(tbl_SubProductCategory model)
        {
            if (ModelState.IsValid)
            {
                await _context.tbl_SubProductCategories.AddAsync(model);
                await _context.SaveChangesAsync();
            }
            return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
        }
        public async Task<JsonResult> GetByAjax(long productCategoryId)
        {
            try
            {
                var result =await _productSubCategoryService.GetSubCategorySelect(productCategoryId);
                return Json(result.model);
            }
            catch (Exception e)
            {
                return Json(null);
            }

        }

        public async Task<IActionResult> Edit(int id)
        {
            var subCat = await _context.tbl_SubProductCategories.FirstOrDefaultAsync(b => b.Id.Equals(id));
            if (subCat == null)
            {
                return NotFound();
            }
            ViewBag.Categories = new SelectList((await _context.GetAllAsync<tbl_ProductCategory>(x => x.IsDelete == false).ToListAsync()), "Id", "Title");
            return View(subCat);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(tbl_SubProductCategory model)
        {
            if (ModelState.IsValid)
            {
                _context.UpdateBaseEntity<tbl_SubProductCategory>(model);
                await _context.SaveChangesAsync();
            }
            return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
        }

        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                var subCat = await _context.tbl_SubProductCategories.FirstOrDefaultAsync(b => b.Id.Equals(Id));
                if (subCat == null)
                    return RedirectToAction(nameof(Index));

                _context.SoftDeletedBaseEntity<tbl_SubProductCategory>(subCat);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return RedirectToAction(nameof(Index));
            }
        }
    }
}
