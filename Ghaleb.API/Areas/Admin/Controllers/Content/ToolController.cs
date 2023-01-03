using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Content
{
    [Authorize(Roles = "Admin")]

    [Area("admin")]
    public class ToolController : Controller
    {
        private readonly ServiceContext _context;
        public ToolController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_Tools>(x=>x.IsDelete !=true).ToListAsync());
        }
        public async Task<IActionResult> Create(long? Id)
        {
            return View(await _context.GetAsync<tbl_Tools>(x => x.Id == Id));
        }
        [HttpPost]
        public async Task<JsonResult> Create(tbl_Tools model)
        {
            try
            {

                var data = await _context.GetAsync<tbl_Tools>(x => x.Id == model.Id);
                if (data == null)
                {
                    _context.CreateBaseEntity<tbl_Tools>(model);

                }
                else
                {
                    data.Name = model.Name;
                    data.Tool = model.Tool;
                }
                await _context.SaveChangesAsync();

                return Json(new { Data = data, message = ALO.Common.Messages.Message.SuccessfullMessage, Status = Status.Success, NotificationType.success });
            }
            catch (Exception e)
            {
                return Json(new { message = ALO.Common.Messages.Message.FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public async Task<IActionResult> Delete(long? Id)
        {
            if (Id == null)
                return Redirect("~/");

            var result = await _context.GetAsync<tbl_Tools>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_Tools>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
