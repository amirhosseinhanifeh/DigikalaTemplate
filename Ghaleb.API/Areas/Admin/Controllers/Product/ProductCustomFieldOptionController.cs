using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]
    public class ProductCustomFieldOptionController : Controller
    {
        private readonly ServiceContext _context;
        public ProductCustomFieldOptionController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long fieldId)
        {
            ViewBag.FieldId = fieldId;
            return View(await _context.GetAllAsync<tbl_ProductCustomFieldsOptionValues>().Where(x=>x.tbl_ProductCustomFieldId==fieldId).ToListAsync());
        }
        public async Task<IActionResult> Create(long fieldId)
        {
            ViewBag.FieldId = fieldId;
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(long fieldId , tbl_ProductCustomFieldsOptionValues model)
        {
            if (ModelState.IsValid)
            {
                model.tbl_ProductCustomFieldId = fieldId;
                await _context.tbl_ProductCustomFieldsOptionValues.AddAsync(model);
                await _context.SaveChangesAsync();
                return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
            }
            return Json(new {  message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType=NotificationType.success });
        }
        public async Task<IActionResult> Delete(long id)
        {
            var data = await _context.tbl_ProductCustomFieldsOptionValues.FindAsync(id);
            _context.tbl_ProductCustomFieldsOptionValues.Remove(data);
            await _context.SaveChangesAsync();
            return Redirect("~/");
        }
    }
}
