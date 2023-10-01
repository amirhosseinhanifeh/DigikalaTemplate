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

    public class FaqController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public FaqController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_Faq>().ToListAsync());
        }
        public async Task<IActionResult> Edit(long? Id)
        {
            var result = await _context.GetAsync<tbl_Faq>(x => x.Id == Id);

            return View(result);
        }
        [HttpPost]
        public async Task<JsonResult> Edit(tbl_Faq model)
        {
            try
            {
                var data = await _context.GetAsync<tbl_Faq>(x => x.Id == model.Id);
                if (data == null)
                {
                    
                    _context.CreateBaseEntity<tbl_Faq>(model);

                }
                else
                {
                    data.Answer = model.Answer;
                    data.Question = model.Question;
                }
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

            var result = await _context.GetAsync<tbl_Faq>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_Faq>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
