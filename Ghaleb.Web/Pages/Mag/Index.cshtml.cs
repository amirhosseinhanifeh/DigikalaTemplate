using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.Service.Interface.Blog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Mag
{
    public class IndexModel : PageModel
    {
        private readonly ServiceContext _context;

        public IndexModel(ServiceContext context)
        {
            _context = context;
        }
        public List<tbl_Blog> Blogs { get; set; } = default!;
        public List<tbl_Blog> NewBlogs { get; set; } = default!;
        public List<tbl_BlogComments> BlogComments { get; set; } = default!;
        [BindProperty(SupportsGet =true)]
        public string Query { get; set; }

        public int TotalCount { get; set; }
        [BindProperty(SupportsGet = true)]
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 16;
        public async Task OnGet()
        {
            Blogs = await _context.tbl_Blogs.Where(x => !string.IsNullOrEmpty(Query) ? x.Title.Contains(Query) : true).OrderByDescending(x=>x.Id).ToListAsync();
            NewBlogs = await _context.tbl_Blogs.OrderByDescending(x=>x.Id).Take(10).ToListAsync();
            BlogComments = await _context.tbl_BlogComments.Where(x=>x.IsActive).OrderByDescending(x=>x.Id).Take(10).ToListAsync();

            TotalCount = Blogs.Count();
        }
    }
}
