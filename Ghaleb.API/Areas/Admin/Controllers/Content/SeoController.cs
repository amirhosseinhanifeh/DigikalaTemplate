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

namespace Ghaleb.API.Areas.Admin.Controllers.Content
{
    [Area("Admin")]
    public class SeoController : Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public SeoController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            var lan = _websitebase.GetCurrectLanguageIdAsync;
            return View(await _context.GetAsync<tbl_Seo>(x=>x.LanguageId==lan));
        }
        [HttpPost]
        public async Task<IActionResult> Index(tbl_Seo model)
        {

            try
            {
                var lan = _websitebase.GetCurrectLanguageIdAsync;

                var data = await _context.GetAsync<tbl_Seo>(x=>x.LanguageId==lan);
                if (data == null)
                {
                    model.LanguageId = lan;
                    _context.CreateBaseEntity<tbl_Seo>(model);

                }
                else
                {
                    data.Address = model.Address;
                    data.FavIconId = model.FavIconId;
                    data.Lat = model.Lat;
                    data.Lng = model.Lng;
                    data.MetaDescription = model.MetaDescription;
                    data.MetaKeyword = model.MetaKeyword;
                    data.PageTitle = model.PageTitle;
                    data.Phone = model.Phone;
                    data.PostalCode = model.PostalCode;
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
