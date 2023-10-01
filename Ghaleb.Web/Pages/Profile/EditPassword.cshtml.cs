using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Profile
{
    [Authorize]
    public class EditPasswordModel : PageModel
    {
        private readonly ServiceContext _context;

        public EditPasswordModel(ServiceContext context)
        {
            _context = context;
        }
        public List<tbl_UserAddresses> UserAddresses { get; set; }
        public void OnGet()
        {
        }
        public async Task OnPostAsync(string NewPassword, string ConfirmNewPassword)
        {
            if (NewPassword==ConfirmNewPassword)
            {

                var user = await _context.tbl_Users.FirstOrDefaultAsync(h => h.Id == User.UserId());
                user.Password = NewPassword;
                await _context.SaveChangesAsync();
                ViewData["Message"] = "رمز عبور با موفقیت تغییر کرد";
            }
            else
            {
                ViewData["Message"] = "رمز عبور با تکرار رمز عبور یکسان نیست";
            }
        }
    }
}
