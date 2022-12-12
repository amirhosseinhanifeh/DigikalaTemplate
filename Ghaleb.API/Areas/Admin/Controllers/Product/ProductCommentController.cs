using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]

    public class ProductCommentController : Controller
    {
        private readonly ServiceContext _context;
        public ProductCommentController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.tbl_ProductComments.Where(x => x.IsDelete != true).Include(x=>x.Product).ToListAsync());
        }
    }
}
