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
        [BindProperty(SupportsGet =true)]
        public long? Id { get; set; }  
        public async Task<IActionResult> OnGetAsync(long id,string? url)
        {
            if (string.IsNullOrEmpty(url))
                return Redirect("~/");

            var res = await _context.tbl_Blogs.Include(x=>x.Image).Include(x=>x.BlogComments).ThenInclude(h=>h.User).ThenInclude(h=>h.Profile).SingleOrDefaultAsync(x => x.Id == id && x.Url == url);
            if (res == null)
                return Redirect("~/");

            res.Visit = res.Visit + 1;
            await _context.SaveChangesAsync();
            Blog = res;
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(string body, string url)
        {
            if (User.Identity.IsAuthenticated)
            {
                _context.tbl_BlogComments.Add(new tbl_BlogComments
                {
                    Body = body,
                    IsActive = false,
                    IsDelete = false,
                    UserId = User.UserId(),
                    BlogId = Id.GetValueOrDefault(),
                });
                await _context.SaveChangesAsync();
            }
            return RedirectToPage("Post", new { id = Id, Url = url });
        }
    }
}
