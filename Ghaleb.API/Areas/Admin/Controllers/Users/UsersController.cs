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

    public class UsersController : Controller
    {
        private readonly ServiceContext _context;

        public UsersController(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(long? roleId)
        {
            return View(await _context.tbl_Users.Include(x=>x.Profile).Include(x=>x.Orders).ThenInclude(x=>x.OrderStateHistories).Where(x=>roleId!=null?x.Roles.Any(h=>h.Id==roleId):true).ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Addresses(long id)
        {
            return View(await _context.tbl_UserAddresses.Where(x=>x.UserId==id).ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Menues(long id)
        {
            return View(await _context.tbl_Menus.Where(x => x.Users.Any(h=>h.Id==id)).ToListAsync());
        }
        public async Task<IActionResult> Sendsms(long id)
        {
            //send sms
            return Redirect("~/");
        }
       
    }
}
