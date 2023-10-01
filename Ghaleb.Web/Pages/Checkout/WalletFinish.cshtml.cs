using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Dto.Payment;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ZarinPal.Class;

namespace Ghaleb.Web.Pages.Checkout
{
    public class WalletFinish : PageModel
    {
        private readonly ServiceContext _context;
        public WalletFinish(ServiceContext context)
        {
            _context = context;
        }
        public bool Status { get; set; } = false;
        public string Message { get; set; }
        public async Task OnGetAsync(string StatusCode=null)
        {

            if (StatusCode == "200")
            {
                Message = "خرید با موفقیت انجام شد";
                Status = true;
            }
            else if(StatusCode == "501")
            {
                Message = "موجودی کیف پول شما کافی نمی باشد";
                Status = false;


            }


        }
    }
}
