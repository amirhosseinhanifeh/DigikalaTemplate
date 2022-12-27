using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

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
        public async Task<IActionResult> Index(long? productId)
        {
            return View(await _context.tbl_ProductComments.Include(x => x.Product).Include(x=>x.User).ThenInclude(x=>x.Profile).Where(x => x.IsDelete != true && productId !=null?x.ProductId==productId:true).ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> ChangeStatus(long id)
        {
            var data = await _context.tbl_ProductComments.FindAsync(id);
            data.IsActive = !data.IsActive;
            await _context.SaveChangesAsync();
            return Json(new { message = SuccessfullMessage, Status = Status.Success, NotificationType.success });
        }
    }
}
