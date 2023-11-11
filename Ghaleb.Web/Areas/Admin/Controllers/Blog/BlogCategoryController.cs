using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.Service.Interface.Blog;
using ALO.ViewModels.Blog;
using ALO.ViewModels.BlogCategory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Areas.Admin.Controllers.Blog
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class BlogCategoryController : Controller
    {
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly ServiceContext _context;

        public BlogCategoryController(IBlogCategoryService blogCategoryService,
            ServiceContext context)
        {
            _blogCategoryService = blogCategoryService;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {

            return View((await _blogCategoryService.GetBlogCategoryForAdmin()).model);
        }
        public async Task<IActionResult> Create()
        {
            ViewBag.BlogTypes = new SelectList(await _context.GetAllAsync<tbl_BlogType>().ToListAsync(), "Id", "Name");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> Create(AddblogCategoryForAdminDTO model)
        {

            try
            {
                var result = await _blogCategoryService.AddUpdateblogCategoryForAdmin(model);
                return Json(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        public async Task<IActionResult> Edit(long Id)
        {
            var result = await _context.GetAsync<tbl_Blog>(x=>x.Id==Id);
            ViewBag.BlogTypes = new SelectList(await _context.GetAllAsync<tbl_BlogType>().ToListAsync(), "Id", "Name",result.BlogCategory.BlogTypeId);
            ViewBag.BlogCategory = new SelectList(await _context.GetAllAsync<tbl_BlogCategory>(x=>x.BlogTypeId==result.BlogCategory.BlogTypeId).ToListAsync(), "Id", "Title", result.BlogCategoryId);
            return View(result);
        }
        [HttpPost]
        public async Task<JsonResult> Edit(AddblogCategoryForAdminDTO model)
        {

            try
            {
                var result = await _blogCategoryService.AddUpdateblogCategoryForAdmin(model);
                return Json(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public IActionResult Delete(long Id)
        {
            _blogCategoryService.Delete(Id);
            return RedirectToAction("Index");
        }
        public async Task<JsonResult> GetByType(long? Id)
        {
            if (Id != null)
            {
                return Json(await _context.GetAllAsync<tbl_BlogCategory>(x => x.BlogTypeId == Id).ToListAsync());
            }
            return Json(null);
        }
    }
}
