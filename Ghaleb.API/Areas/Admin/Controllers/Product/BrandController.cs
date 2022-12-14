using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]

    public class BrandController : Controller
    {
        private readonly ServiceContext _context;
        public BrandController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_Brands>().ToListAsync());
        }
        public async Task<IActionResult> Create()
        {
            ViewBag.Categories = new SelectList((await _context.GetAllAsync<tbl_MainProductCategory>(x => x.IsDelete == false).ToListAsync()), "Id", "Name");
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Create(tbl_Brands model)
        {
            if (ModelState.IsValid)
            {
                await _context.tbl_Brands.AddAsync(model);
                await _context.SaveChangesAsync();
            }

            return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
        }
    }
}
