using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Ghaleb.Web.Helpers;
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

    public class PageContentController : Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public PageContentController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            var lan = _websitebase.GetCurrectLanguageIdAsync;

            return View(await _context.GetAllAsync<tbl_PageContent>(x => x.LanguageId == lan).ToListAsync());
        }
        public async Task<IActionResult> Edit(long? Id)
        {
            var data = await _context.GetAsync<tbl_PageContent>(x => x.Id == Id);
            data.MetaKeywords = data.MetaKeyword.Split(',');
            return View(data);
        }
        [HttpPost]
        public async Task<IActionResult> Edit(tbl_PageContent model)
        {

            try
            {
                var lan = _websitebase.GetCurrectLanguageIdAsync;

                var data = await _context.GetAsync<tbl_PageContent>(x => x.LanguageId == lan && x.Id == model.Id);
                if (data == null)
                {
                    model.LanguageId = lan;
                    _context.CreateBaseEntity<tbl_PageContent>(model);

                }
                else
                {
                    data.Description = model.Description;
                    data.MetaDescription = model.MetaDescription;
                    data.MetaKeyword = string.Join(",", model.MetaKeywords);
                    data.PageTitle = model.PageTitle;
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
    }
}
