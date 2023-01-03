using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.Service.Interface.Blog;
using ALO.ViewModels.Blog;
using ALO.ViewModels.Blog.Admin;
using ALO.ViewModels.Result;
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

    public class BlogController : Controller
    {
        private readonly IBlogService _blogService;
        private readonly IBlogCategoryService _blogCategoryService;
        private readonly ServiceContext _context;

        public BlogController(IBlogService blogService, IBlogCategoryService blogCategoryService,
            ServiceContext context)
        {
            _blogService = blogService;
            _blogCategoryService = blogCategoryService;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var Result = await _context.GetAllAsync<tbl_Blog>().Include(x=>x.BlogCategory).Include(x=>x.BlogComments).Where(x=>x.IsDelete==false).ToListAsync();
            return View(Result);
        }
        public async Task<IActionResult> Create()
        {
            ViewBag.BlogType = new SelectList(await _context.GetAllAsync<tbl_BlogType>().ToListAsync(), "Id", "Name");
            ViewBag.Categories = new SelectList(new List<tbl_BlogCategory>(), "Id", "Value");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> Create(RequestBlogDTO model)
        {

            try
            {
                var result = await _blogService.CreateUpdate(model);
                return Json(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public async Task<IActionResult> Edit(long? Id)
        {
            if (Id == null)
                return Redirect("~/");
            var result = await _context.GetAsync<tbl_Blog>(x => x.Id == Id,includes:new string[] { "BlogCategory" });
            if (result == null)
                return Redirect("~/");
            ViewBag.BlogType = new SelectList((await _context.GetAllAsync<tbl_BlogType>().ToListAsync()), "Id", "Name",result.BlogCategory.BlogTypeId);
            ViewBag.Categories = new SelectList((await _context.GetAllAsync<tbl_BlogCategory>(x=>x.BlogTypeId==result.BlogCategory.BlogTypeId).ToListAsync()), "Id", "Title",result.BlogCategoryId);

            var data = new RequestBlogDTO
            {
                Abstract = result.Abstract,
                BlogCategoryId = result.BlogCategoryId,
                Description = result.Description,
                Id = result.Id,
                ImageId = result.ImageId.GetValueOrDefault(),
                MetaDescription = result.MetaDescription,
                MetaKeyword = result.MetaKeyword.Split(","),
                PageTitle = result.PageTitle,
                ShowInHome = result.ShowInHome,
                Title = result.Title,
                Url = result.Url
            };
            return View(data);
        }
        [HttpPost]
        public async Task<JsonResult> Edit(RequestBlogDTO model)
        {

            try
            {
                var result = await _blogService.CreateUpdate(model);
                return Json(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public IActionResult Delete(long Id)
        {
            _blogService.Delete(Id);
            return RedirectToAction("Index");
        }
    }
}
