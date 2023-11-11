using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.API.Areas.Admin.Controllers.Blog
{
    [Authorize(Roles = "Admin")]
    [Area("Admin")]
    public class BlogCommentController : Controller
    {
        private readonly ServiceContext _context;
        public BlogCommentController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long? blogId)
        {
            return View(await _context.tbl_BlogComments.Include(x => x.BlogComments).Include(x => x.Blog).Include(x => x.User).ThenInclude(x => x.Profile).Where(x => x.IsDelete != true && x.BlogCommentId == null && (blogId != null ? x.BlogId == blogId : true)).ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Details(long id)
        {
            return View(await _context.tbl_BlogComments.Include(x => x.User).ThenInclude(x => x.Profile).Include(x => x.BlogComments).Where(x => x.Id == id).FirstOrDefaultAsync());
        }
        [HttpPost]
        public async Task<IActionResult> Details(long Id, string Body)
        {
            var comment = await _context.tbl_BlogComments.Include(x => x.BlogComments).FirstOrDefaultAsync(x => x.Id == Id);

            comment.BlogComments.Add(new tbl_BlogComments
            {
                IsActive = true,
                BlogId = Id,
                Body = Body,
                UserId = User.UserId()
            });
            await _context.SaveChangesAsync();
            return RedirectToAction("Details", new { Id });
        }
    }
}
