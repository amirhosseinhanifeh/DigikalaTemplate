using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Blog
{
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
            return View(await _context.tbl_BlogComments.Where(x=>x.IsDelete !=true && blogId !=null?x.BlogId==blogId:true).ToListAsync());
        }
    }
}
