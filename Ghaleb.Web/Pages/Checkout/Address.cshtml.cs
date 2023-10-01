using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using Ghaleb.Web.Helpers;
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
        public async Task<IActionResult> OnPostCreateAddress(RequestAddAddressDto model)
        {
            var data = new tbl_UserAddresses
            {
                Address = model.Address,
                Lat = model.Lat,
                Long = model.Lng,
                Mobile = model.Mobile,
                Phone = model.Phone,
                UserId = User.UserId(),
                Pelak = model.Pelak,
                Vahed = model.Vahed,
                IsDefault = false

            };
            await _context.tbl_UserAddresses.AddAsync(data);
            await _context.SaveChangesAsync();
            return RedirectToPage("Address");
        }
    }
    public class RequestAddAddressDto
    {
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Pelak { get; set; }
        public int Vahed { get; set; }

    }
}
