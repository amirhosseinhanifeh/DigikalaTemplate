using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Users
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class UsersController : Controller
    {
        private readonly ServiceContext _context;

        public UsersController(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(long? roleId,
            string fullName = null,
            string email = null,
            string mobile = null
            )
        {
            ViewBag.Roles = new SelectList(await _context.tbl_Role.ToListAsync(), "Id", "RoleName", roleId);
            ViewBag.FullName = fullName;
            ViewBag.Mobile = mobile;
            ViewBag.Email = email;
            return View(await _context.tbl_Users
                .AsNoTracking()
                .Include(x => x.Profile)
                .Include(x => x.Orders)
                .ThenInclude(x => x.OrderStateHistories)
                .Where(x => !x.IsDelete)
                .Where(x => roleId != null ? x.Roles.Any(h => h.Id == roleId) : true)
                .Where(x => fullName != null ? (x.Profile.FirstName + " " + x.Profile.LastName).Contains(fullName) : true)
                .Where(x => mobile != null ? x.Mobile.Contains(mobile) : true)
                .Where(x => email != null ? x.Email.Contains(email) : true)
                .OrderByDescending(x => x.Id)
                .ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Addresses(long id)
        {
            return View(await _context.tbl_UserAddresses.AsNoTracking().Where(x => x.UserId == id).ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Menues(long id)
        {
            return View(await _context.tbl_Menus.AsNoTracking().Where(x => x.Users.Any(h => h.Id == id)).ToListAsync());
        }
        public async Task<IActionResult> Sendsms(long id)
        {
            //send sms
            return View();
        }

        public async Task<IActionResult> Edit()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Edit(object model)
        {
            return View();
        }
        public async Task<IActionResult> Delete(long Id)
        {
            var user = await _context.tbl_Users.FirstOrDefaultAsync(x => x.Id == Id);
            user.IsDelete = true;
            user.IsActive = false;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public async Task<IActionResult> Sendsms(long id, string message)
        {
            //send sms
            return View();
        }
    }
}
