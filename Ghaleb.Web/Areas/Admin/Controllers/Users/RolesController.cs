using ALO.DataAccessLayer.DataContext;
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
            return View(await _context.tbl_Role.Include(x=>x.Users).ToListAsync());
        }

        public async Task<IActionResult> Sendsms(long id)
        {
            //send sms

            var users =await _context.tbl_Users.Where(x => x.Roles.Any(h => h.Id == id)).ToListAsync();
            foreach (var item in users)
            {
                //send sms
            }
            return Redirect("~/");
        }
    }
}
