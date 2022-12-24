using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class PageContentModel : PageModel
    {
        private readonly ServiceContext _context;

        public PageContentModel(ServiceContext context)
        {
            _context = context;
        }

        public tbl_PageContent Data { get; set; }
        public async Task OnGetAsync(string url)
        {
            Data =await _context.tbl_PageContent.FirstOrDefaultAsync(x => x.Url == url);
        }
    }
}
