using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Mag
{
    public class IndexModel : PageModel
    {
        private readonly ServiceContext context;

        public IndexModel(ServiceContext context)
        {
            this.context = context;
        }
        public List<tbl_Blog> Blogs { get; set; }
        public async Task OnGet()
        {
            Blogs =await context.tbl_Blogs.OrderByDescending(h=>h.Id).Include(x=>x.Image).ToListAsync();
        }
    }
}
