using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Content
{
    [Authorize(Roles = "Admin")]

    [Area("Admin")]
    public class SocialNetworkController : Controller
    {
        private readonly ServiceContext _context;
        public SocialNetworkController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_SocialNetworks>().ToListAsync());
        }
        public async Task<IActionResult> Create(long? Id)
        {
            return View(await _context.GetAsync<tbl_SocialNetworks>(x=>x.Id==Id));
        }
        [HttpPost]
        public async Task<JsonResult> Create(tbl_SocialNetworks model)
        {
            try
            {

                var data = await _context.GetAsync<tbl_SocialNetworks>(x => x.Id == model.Id);
                if (data == null)
                {
                    _context.CreateBaseEntity<tbl_SocialNetworks>(model);

                }
                else
                {
                    data.Icon = model.Icon;
                    data.Social = model.Social;
                    data.Url = model.Url;

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

            var result = await _context.GetAsync<tbl_SocialNetworks>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_SocialNetworks>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
