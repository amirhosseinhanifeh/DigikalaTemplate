using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
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
        public async Task OnGetAsync(long id)
        {
            var res = await _context.tbl_Blogs.SingleOrDefaultAsync(x => x.Id == id);
            Blog = res;
        }
    }
}
