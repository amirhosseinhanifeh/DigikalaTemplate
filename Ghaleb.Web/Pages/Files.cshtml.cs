using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class FilesModel : PageModel
    {
        private readonly ServiceContext _context;

        public FilesModel(ServiceContext context)
        {
            _context = context;
        }
        public tbl_PageContent Seo { get; set; }
        public async Task OnGetAsync()
        {
            Seo = await _context.tbl_PageContent.FirstOrDefaultAsync(x => x.Url == "files");
        }
    }
}
