using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Checkout
{
    [Authorize]
    public class AddressModel : PageModel
    {
        private readonly ServiceContext _context;

        public AddressModel(ServiceContext context)
        {
            _context = context;
        }

        public List<tbl_UserAddresses> Addresses { get; set; }
        public async Task OnGetAsync()
        {
            Addresses = await _context.tbl_UserAddresses.Where(x => x.UserId == User.UserId()).ToListAsync();
        }
        public IActionResult OnPost(long addressId)
        {
            Response.Cookies.Append("Address", addressId.ToString());
            return RedirectToPage("/checkout/payment");
        }
    }
}
