using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.Entity.Forms;
using ALO.ViewModels.Forms;
using AspNetCore.ReCaptcha;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    [ValidateReCaptcha(ErrorMessage = "کپچا نا معتبر")]
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
        public string Message { get; set; }
        [BindProperty]
        public FormRepairDTO model { get; set; }
        public async Task OnPostAsync()
        {
            if (ModelState.IsValid)
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
                Message = "درخواست شما با موفقیت ثبت شد";
            }

            Seo = await _context.tbl_PageContent.FirstOrDefaultAsync(x => x.Url == "repair");
        }
    }
}
