using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.BankSetting;
using ALO.DomainClasses.Entity.Blog;
using ALO.DomainClasses.Entity.Country;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Areas.Admin.Controllers.Settings
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class BankController : Controller
    {
        private readonly ServiceContext _context;

        public BankController(ServiceContext serviceContext)
        {
            _context = serviceContext;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.tbl_Banks.AsNoTracking().ToListAsync());
        }
        public async Task<IActionResult> Create(long? Id)
        {
            ViewBag.BankTypes = new SelectList(Enum.GetValues(typeof(BankType)).Cast<BankType>(), "Id", "Value");
            return View(await _context.tbl_Banks.FirstOrDefaultAsync(x => x.Id == Id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(long? Id, tbl_Banks model)
        {
            var data = await _context.tbl_Banks.FirstOrDefaultAsync(x => x.Id == Id);
            if (data != null)
            {
                data.BankType = model.BankType;
                data.PaymentUrl = model.PaymentUrl;
                data.SandBoxUrl = model.SandBoxUrl;
                data.IsSandbox = model.IsSandbox;
                data.IsActive = model.IsActive;
            }
            else
            {
                await _context.tbl_Banks.AddAsync(model);

            }
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> Delete(long Id)
        {
            var data = await _context.tbl_Banks.FirstOrDefaultAsync(x => x.Id == Id);
            data.IsDelete = true;
            data.IsActive = false;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
