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
    public class EditProfileModel : PageModel
    {
        private readonly ServiceContext _context;

        public EditProfileModel(ServiceContext context)
        {
            _context = context;
        }
        [BindProperty]
        public tbl_Users UserInfo { get; set; }
        public async Task OnGet()

        {
            UserInfo = await _context.tbl_Users.Include(h => h.Profile).FirstOrDefaultAsync(h => h.Id == User.UserId());
        }

        public async Task OnPostAsync()
        {
            var user = await _context.tbl_Users.Include(h => h.Profile).FirstOrDefaultAsync(h => h.Id == User.UserId());

            user.Email = UserInfo.Email;
            user.Profile.FirstName = UserInfo.Profile.FirstName;
            user.Profile.LastName = UserInfo.Profile.LastName;
            await _context.SaveChangesAsync();
        }
    }
}
