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
    public class AddressModel : PageModel
    {
        private readonly ServiceContext _context;

        public AddressModel(ServiceContext context)
        {
            _context = context;
        }
        public List<tbl_UserAddresses> UserAddresses { get; set; }
        public async Task OnGet()
        {
            UserAddresses = await _context.tbl_UserAddresses.Where(x => x.UserId == User.UserId() && x.IsDelete == false).OrderByDescending(x => x.Id).ToListAsync();
        }
        public async Task<IActionResult> OnGetDelete(long Id)
        {
            var address = await _context.tbl_UserAddresses.FirstOrDefaultAsync(h => h.Id == Id);
            address.IsDelete = true;
            await _context.SaveChangesAsync();
            return RedirectToPage("Address");
        }
        public async Task<IActionResult> OnPostAddAddress(tbl_UserAddresses model)
        {
            tbl_UserAddresses userAddresses = new tbl_UserAddresses
            {
                Address = model.Address,
                UserId = User.UserId().GetValueOrDefault(),
                Vahed = model.Vahed,
                Mobile = model.Mobile,
                ReciverName = model.ReciverName,
                PostalCode = model.PostalCode,
                Pelak = model.Pelak,

            };
            await _context.tbl_UserAddresses.AddAsync(userAddresses);
            await _context.SaveChangesAsync();
            return RedirectToPage("Address");
        }
        public async Task<IActionResult> OnPostEditAddress(long Id, tbl_UserAddresses model)
        {
            tbl_UserAddresses userAddresses = new tbl_UserAddresses
            {
                Address = model.Address,
                UserId = User.UserId().GetValueOrDefault(),
                Vahed = model.Vahed,
                Mobile = model.Mobile,
                ReciverName = model.ReciverName,
                PostalCode = model.PostalCode,
                Pelak = model.Pelak,

            };
            await _context.tbl_UserAddresses.AddAsync(userAddresses);
            await _context.SaveChangesAsync();
            return RedirectToPage("Address");
        }
    }
}
