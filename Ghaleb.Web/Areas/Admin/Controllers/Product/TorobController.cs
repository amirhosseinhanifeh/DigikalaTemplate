
using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]
    public class TorobController : Controller
    {
        private readonly ServiceContext _context;

        public TorobController(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index(long id)
        {
            return View(await _context.tbl_TorobProducts.Where(h=>h.ProductId==id).ToListAsync());
        }
    }
}
