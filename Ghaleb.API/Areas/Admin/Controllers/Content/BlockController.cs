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
    [Area("Admin")]

    public class BlockController : Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public BlockController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            var lan = _websitebase.GetCurrectLanguageIdAsync;
            return View(await _context.GetAllAsync<tbl_Blocks>(x=>x.LanguageId==lan).ToListAsync());
        }
        public async Task<IActionResult> Edit(long? Id)
        {

            var result = await _context.GetAsync<tbl_Blocks>(x => x.Id == Id, includes: new string[] { "Image" });

            return View(result);
        }
        [HttpPost]
        public async Task<JsonResult> Edit(tbl_Blocks model)
        {
            try
            {
                var data = await _context.GetAsync<tbl_Blocks>(x => x.Id == model.Id);
                if (data == null)
                {
                    
                    model.LanguageId = _websitebase.GetCurrectLanguageIdAsync;
                    _context.CreateBaseEntity<tbl_Blocks>(model);

                }
                else
                {
                    data.Description = model.Description;
                    data.ImageId = model.ImageId;
                    data.Title = model.Title;
                    data.Name = model.Name;
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

            var result = await _context.GetAsync<tbl_Blocks>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_Blocks>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
