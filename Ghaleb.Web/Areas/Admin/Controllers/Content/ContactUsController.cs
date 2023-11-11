using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ghaleb.API.Areas.Admin.Controllers.Content
{
    [Authorize(Roles = "Admin")]

    [Area("Admin")]

    public class ContactUsController : Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;

        public ContactUsController(ServiceContext context, WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAsync<tbl_ContactUsDetails>(x => x.LanguageId == _websitebase.GetCurrectLanguageIdAsync));
        }
        [HttpPost]
        public async Task<IActionResult> Index(tbl_ContactUsDetails model)
        {

            try
            {
                var lan = _websitebase.GetCurrectLanguageIdAsync;

                var data = await _context.GetAsync<tbl_ContactUsDetails>(x => x.LanguageId == lan);
                if (data == null)
                {
                    model.LanguageId = lan;
                    _context.CreateBaseEntity<tbl_ContactUsDetails>(model);

                }
                else
                {
                    data.Address = model.Address;
                    data.Email = model.Email;
                    data.Lat = model.Lat;
                    data.Lng = model.Lng;
                    data.Mobile = model.Mobile;
                    data.Phone = model.Phone;
                    data.Tel = model.Tel;
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
