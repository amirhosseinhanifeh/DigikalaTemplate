using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Users
{
    [Area("Admin")]
    public class UsersController : Controller
    {
        private readonly ServiceContext _context;

        public UsersController(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.tbl_Users.Include(x=>x.Profile).Include(x=>x.Orders).ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Addresses(long id)
        {
            return View(await _context.tbl_UserAddresses.Where(x=>x.UserId==id).ToListAsync());
        }
        
    }
}
