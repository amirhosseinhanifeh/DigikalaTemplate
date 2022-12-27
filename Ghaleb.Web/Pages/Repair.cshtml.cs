using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.Entity.Forms;
using ALO.ViewModels.Forms;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class RepairModel : PageModel
    {
        private readonly ServiceContext _context;

        public RepairModel(ServiceContext context)
        {
            _context = context;
        }
        public tbl_PageContent Seo { get; set; }
        public async Task OnGetAsync()
        {
            Seo = await _context.tbl_PageContent.FirstOrDefaultAsync(x => x.Url == "repair");
        }
        public async Task OnPostAsync(FormRepairDTO model)
        {

            await _context.tbl_FormRepairs.AddAsync(new tbl_FormRepair
            {
                Body = model.Body,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Mobile = model.Mobile,
                UserId = User.Identity.IsAuthenticated ? User.UserId() : null

            });
            await _context.SaveChangesAsync();


        }
    }
}
