using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.Entity.IMG;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Content
{


    [Area("Admin")]
    [Authorize]
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


        [HttpGet]
        public async Task<IActionResult> PageBuilder()
        {
            return View();
        }
        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
        public async Task<IActionResult> Upload()
        {
            HttpContext.Session.SetInt32("counter",0);
            ViewBag.IsUrl = true;

            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            var data = ReadFully(file.OpenReadStream());
            tbl_Image image = new tbl_Image
            {
                Url = data,
                FileType = FileType.Video,

            };
            await _context.tbl_Image.AddAsync(image);
            await _context.SaveChangesAsync();

            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Download(long id, bool? isIdm )
        {
            var counter = HttpContext.Session.GetInt32("counter");
            counter = counter + 1;
            if (counter > 1)
            {
                return NotFound();
            }
            HttpContext.Session.SetInt32("counter", counter.Value);
            var data = await _context.tbl_Image.FirstOrDefaultAsync(x => x.Id == id);

            return File(data.Url, "application/octet-stream", $"video.mp4"); // returns a FileStreamResult
        }

    }
}
