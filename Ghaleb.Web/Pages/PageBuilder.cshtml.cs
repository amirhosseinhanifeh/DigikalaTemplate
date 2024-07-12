using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class PageBuilderModel : PageModel
    {
        private readonly ServiceContext serviceContext;

        public PageBuilderModel(ServiceContext serviceContext)
        {
            this.serviceContext = serviceContext;
        }
        public string Raw { get; set; }
        public async Task<IActionResult> OnGet(int id)
        {
           var res=await serviceContext.tbl_PageContent.FirstOrDefaultAsync(x => x.Id == id);
            Raw = res.Description;
            return Page();
        }
        public async Task<IActionResult> OnPostSaveRaw(int id,string raw)
        {
            var res =await serviceContext.tbl_PageContent.FirstOrDefaultAsync(x=>x.Id==id);
            res.Description = raw;
            await serviceContext.SaveChangesAsync();
            return Page();
        }

    }
}
