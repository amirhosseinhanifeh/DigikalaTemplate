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
            return View(await _context.GetAllAsync<tbl_Brands>(x=>x.IsDelete == false).ToListAsync());
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

        public async Task<IActionResult> Edit(int id)
        {
            var brand = await _context.tbl_Brands.Include(b=> b.Logo).FirstOrDefaultAsync(b =>b.Id.Equals(id));
            if (brand == null)
            {
                return NotFound();
            }
            ViewBag.Categories = new SelectList((await _context.GetAllAsync<tbl_MainProductCategory>(x => x.IsDelete == false).ToListAsync()), "Id", "Name");
            return View(brand);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(tbl_Brands model)
        {
            if (ModelState.IsValid)
            {
                _context.UpdateBaseEntity<tbl_Brands>(model);
                await _context.SaveChangesAsync();
            }
            return Json(new { message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
        }
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                var brand = await _context.tbl_Brands.FirstOrDefaultAsync(b => b.Id.Equals(Id));
                if (brand == null)
                    return RedirectToAction(nameof(Index));

                _context.SoftDeletedBaseEntity<tbl_Brands>(brand);
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
