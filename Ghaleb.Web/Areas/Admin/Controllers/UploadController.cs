using ALO.Service.Interface.Image;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Drawing;
using ALO.Common.Enums;

namespace Ghaleb.API.Areas.Admin.Controllers
{

    [Area("Admin")]

    public class UploadController : Controller
    {
        private readonly IImageService _img;
        private readonly IFileService _fileService;
        public UploadController(IImageService img,
            IFileService fileService)
        {
            _img = img;
            _fileService = fileService;

        }

        public IActionResult UploadImage()
        {
            return PartialView();
        }
        [HttpPost]
        public async Task<JsonResult> UploadImage(IFormFile file,long? Id=null)
        {
            try
            {
                var result = await _img.UploadAsync(file, null);
                if (result != null)
                {
                    var data = await _img.CreateAsync(result.model,Id);
                    return Json(new {Data= data.model.Id, message = "با موفقیت ثبت شد", Status = Status.Success, NotificationType = NotificationType.success });
                }
                else
                {
                    return Json(result);
                }
            }
            catch (Exception e)
            {
                var st = new StackTrace(e, true);
                // Get the top stack frame
                var frame = st.GetFrame(0);
                // Get the line number from the stack frame
                var line = frame.GetFileLineNumber();
                return Json(e.Message + line);
            }

        }
        public async Task<JsonResult> UploadImages(IFormFile[] files)
        {
            try
            {
                List<long> ids = new List<long>();
                foreach (var item in files)
                {
                    var result = await _img.UploadAsync(item,null);
                    if (result != null)
                    {
                        var data = await _img.CreateAsync(result.model);
                        ids.Add(data.model.Id);
                    }
                    else
                    {

                        return Json(result);
                    }
                }
                return Json(ids);

            }
            catch (Exception e)
            {
                var st = new StackTrace(e, true);
                // Get the top stack frame
                var frame = st.GetFrame(0);
                // Get the line number from the stack frame
                var line = frame.GetFileLineNumber();
                return Json(e.Message + line);
            }

        }
        [HttpPost]
        public async Task<JsonResult> UploadFile(IFormFile file)
        {
            try
            {
                var result = await _fileService.UploadAsync(file, "Templates");
                if (result != null)
                {
                    var data = await _fileService.CreateAsync(result.model);
                    return Json(data.model.Id);
                }
                return Json(null);
            }
            catch (Exception e)
            {
                return Json(null);
            }

        }
        [HttpPost]
        public ActionResult UploadImageFromCk(IFormFile upload)
        {
            if (upload.Length <= 0) return null;

            var fileName = Guid.NewGuid() + Path.GetExtension(upload.FileName).ToLower();

            var path = Path.Combine(
                Directory.GetCurrentDirectory(), "wwwroot/images/CKEditorImages",
                fileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                upload.CopyTo(stream);

            }

            var url = $"/images/CKEditorImages/{fileName}";

            return new JsonResult(new

            {
                uploaded = 1,
                fileName = upload.FileName,
                url = url
            });
        }
    }
}
