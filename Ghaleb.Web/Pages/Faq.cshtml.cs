using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class FaqModel : PageModel
    {
        private readonly ServiceContext _context;

        public FaqModel(ServiceContext context)
        {
            _context = context;
        }
        public List<tbl_Faq> Faqs { get; set; }
        public tbl_PageContent Seo { get; set; }
        public async Task OnGet()
        {

            Faqs =await _context.tbl_Faq.Where(x => x.IsActive && x.IsDelete != true).OrderBy(x=>x.Row).ToListAsync();
            Seo = await _context.tbl_PageContent.FirstOrDefaultAsync(x => x.Url == "faq");
        }
    }
}
