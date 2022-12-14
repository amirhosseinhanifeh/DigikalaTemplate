using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]
    public class ProductCustomFieldController : Controller
    {
        private readonly ServiceContext _context;
        public ProductCustomFieldController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long? categoryId, long? subCategoryId)
        {
            ViewBag.SubCategoryId = subCategoryId;
            ViewBag.CategoryId = categoryId;

            return View(await _context.GetAllAsync<tbl_ProductCustomFields>(x => categoryId != null ? x.ProductCategoryId == categoryId : true && subCategoryId != null ? x.SubProductCategoryId == subCategoryId : true).ToListAsync());
        }
        public IActionResult Create(long? categoryId, long? subCategoryId)
        {
            ViewBag.SubCategoryId = subCategoryId;
            ViewBag.CategoryId = categoryId;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(long? categoryId,long? subCategoryId, tbl_ProductCustomFields model)
        {
            if (ModelState.IsValid)
            {
                model.ProductCategoryId = categoryId;
                model.SubProductCategoryId = subCategoryId;
                await _context.tbl_ProductCustomFields.AddAsync(model);
                await _context.SaveChangesAsync();
            }
            return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
        }
    }
}
