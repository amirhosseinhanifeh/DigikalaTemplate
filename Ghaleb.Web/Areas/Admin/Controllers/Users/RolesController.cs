using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Users
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class RolesController : Controller
    {
        private readonly ServiceContext _context;

        public RolesController(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.tbl_Role.Where(x => !x.IsDelete).Include(x => x.Users).ToListAsync());
        }

        public async Task<IActionResult> Create(long? Id)
        {
            return View(await _context.tbl_Role.FirstOrDefaultAsync(x => x.Id == Id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(long? Id, tbl_Role model)
        {
            var role = await _context.tbl_Role.FirstOrDefaultAsync(x => x.Id == Id);
            if (role == null)
            {
                await _context.tbl_Role.AddAsync(model);

            }
            else
            {
                role.ModifiedDate = DateTime.UtcNow;
                role.RoleName = model.RoleName;
                role.RoleIndex = model.RoleIndex;
                role.IsActive = model.IsActive;

            }
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> Delete(long Id)
        {
            var user = await _context.tbl_Role.FirstOrDefaultAsync(x => x.Id == Id);
            user.IsDelete = true;
            user.IsActive = false;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Sendsms(long id)
        {
            //send sms

            var users = await _context.tbl_Users.Where(x => x.Roles.Any(h => h.Id == id)).ToListAsync();
            foreach (var item in users)
            {
                //send sms
            }
            return Redirect("~/");
        }
    }
}
