using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using AyandeNama.Web.Helpers;
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
    public class SlideShowController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public SlideShowController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            var lan = _websitebase.GetCurrectLanguageIdAsync;

            return View(await _context.GetAllAsync<tbl_SlideShow>(x => x.LanguageId == lan).ToListAsync());
        }
        public async Task<IActionResult> Create(long? Id)
        {
            return View(await _context.GetAsync<tbl_SlideShow>(x => x.Id == Id));
        }
        [HttpPost]
        public async Task<JsonResult> Create(tbl_SlideShow model)
        {
            try
            {
                var data = await _context.GetAsync<tbl_SlideShow>(x => x.Id == model.Id);
                if (data == null)
                {
                    var lan = _websitebase.GetCurrectLanguageIdAsync;
                    model.LanguageId = lan;
                    _context.CreateBaseEntity<tbl_SlideShow>(model);

                }
                else
                {
                    data.ImageId = model.ImageId;
                    data.Link = model.Link;
                    data.LinkText = model.LinkText;
                    data.Title = model.Title;
                    data.Order = model.Order;

                }
                await _context.SaveChangesAsync();

                return Json(new { Data = data, message = ALO.Common.Messages.Message.SuccessfullMessage, Status = Status.Success, NotificationType.success });
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

            var result = await _context.GetAsync<tbl_SlideShow>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_SlideShow>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
