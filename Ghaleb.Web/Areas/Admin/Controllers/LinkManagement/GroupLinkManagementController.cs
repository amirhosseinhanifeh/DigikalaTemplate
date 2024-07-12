using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.LinkManagement;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace AyandeNama.Web.Areas.Admin.Controllers.LinkManagement
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class GroupLinkManagementController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public GroupLinkManagementController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            var lan = _websitebase.GetCurrectLanguageIdAsync;

            return View(await _context.GetAllAsync<tbl_GroupLinkManagement>(x=>x.LanguageId==lan).ToListAsync());
        }
        public async Task<IActionResult> Edit(long? Id)
        {
            return View(await _context.GetAsync<tbl_GroupLinkManagement>(x => x.Id == Id));
        }
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> Create(tbl_GroupLinkManagement model)
        {

            try
            {
                var lan = _websitebase.GetCurrectLanguageIdAsync;
                model.LanguageId = lan;
                var result = _context.CreateBaseEntity(model);
               await _context.SaveChangesAsync();
                return Json(new { Data = result, message = SuccessfullMessage, Status = Status.Success, NotificationType.success });
            }
            catch (Exception)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public async Task<IActionResult> Delete(long? Id)
        {
            if (Id == null)
                return Redirect("~/");

            var result = await _context.GetAsync<tbl_GroupLinkManagement>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_GroupLinkManagement>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
