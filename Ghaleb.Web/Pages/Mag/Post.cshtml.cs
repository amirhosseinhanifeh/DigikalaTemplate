using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.DomainClasses.Entity.Product;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Mag
{
    public class PostModel : PageModel
    {
        private ServiceContext _context;

        public PostModel(ServiceContext context)
        {
            _context = context;
        }
        public tbl_Blog Blog { get; set; }
        public List<tbl_Blog> NewBlogs { get; set; } = default!;
        public List<tbl_BlogComments> BlogComments { get; set; } = default!;
        [BindProperty(SupportsGet =true)]
        public int Id { get; set; }
        [BindProperty(SupportsGet = true)]
        public string Url { get; set; }
        public async Task OnGetAsync(long id)
        {
            var res = await _context.tbl_Blogs.
                Include(x => x.Image)
                .Include(x => x.BlogComments)
                .ThenInclude(x => x.User)
                .ThenInclude(x => x.Profile)
                .Include(x => x.BlogComments)
                .ThenInclude(x => x.BlogComments)
                .ThenInclude(x => x.User)
                .ThenInclude(x => x.Profile).SingleOrDefaultAsync(x => x.Id == id);
            res.Visit = res.Visit + 1;
            await _context.SaveChangesAsync();
            Blog = res;

            NewBlogs = await _context.tbl_Blogs.OrderByDescending(x => x.Id).Take(10).ToListAsync();
            BlogComments = await _context.tbl_BlogComments.Where(x => x.IsActive).OrderByDescending(x => x.Id).Take(10).ToListAsync();
        }

        public async Task<IActionResult> OnPostAsync(tbl_BlogComments model)
        {
            if (User.Identity.IsAuthenticated)
            {
                model.Id = 0;
                model.UserId = User.UserId().GetValueOrDefault();
                model.IsActive = false;
                model.BlogId = Id;
                _context.tbl_BlogComments.Add(model);
                await _context.SaveChangesAsync();
            }
            return RedirectToPage("Post", new { id = Id, url=Url });
        }

    }
}
