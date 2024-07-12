using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.Entity.IMG;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AyandeNama.Web.Areas.Admin.Controllers.Content
{
    [Authorize(Roles = "Admin")]

    [Area("Admin")]

    public class MediaController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public MediaController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_Image>(x => x.FileType == FileType.Video).Include(x=>x.VideoDetail).ToListAsync());
        }
        public async Task<IActionResult> Edit(long? Id)
        {
            var result = await _context.GetAsync<tbl_Image>(x => x.Id == Id, includes: new string[] { "VideoDetail" });

            return View(result);
        }
        [HttpPost]
        public async Task<JsonResult> Edit(long? Id ,tbl_Image model)
        {
            try
            {
                var data = await _context.GetAsync<tbl_Image>(x => x.Id == Id, new string[] { "VideoDetail" });

                if (data.VideoDetail == null)
                {
                    data.VideoDetail = new tbl_VideoDetail();
                }
                data.VideoDetail.VideoId = model.Id;
                data.FileType = FileType.Video;
                data.VideoDetail.Description = model.VideoDetail.Description;
                data.VideoDetail.Title = model.VideoDetail.Title;
                await _context.SaveChangesAsync();

                return Json(new { Data = "", message = ALO.Common.Messages.Message.SuccessfullMessage, Status = Status.Success, NotificationType.success });
            }
            catch (Exception)
            {
                return Json(new { message = ALO.Common.Messages.Message.FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public async Task<IActionResult> Delete(long? Id)
        {
            if (Id == null)
                return Redirect("~/");

            var result = await _context.GetAsync<tbl_Image>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_Image>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
