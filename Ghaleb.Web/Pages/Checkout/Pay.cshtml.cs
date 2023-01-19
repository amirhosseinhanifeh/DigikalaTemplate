using ALO.DataAccessLayer.DataContext;
using Dto.Payment;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ZarinPal.Class;

namespace Ghaleb.Web.Pages.Checkout
{
    public class PayModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly Payment _payment;
        private readonly IConfiguration configuration;
        public PayModel(ServiceContext context, IConfiguration configuration)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
            this.configuration = configuration;
        }
        public async Task<IActionResult> OnGetAsync(long orderId)
        {
            
            var isSandbox =Convert.ToBoolean(configuration["PaymentSetting:IsSandbox"]);
            var o = await _context.tbl_Orders
                .Include(x=>x.User)
                .Include(x => x.UserAddress)
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.ProductPriceHistory)
                .FirstOrDefaultAsync(x => x.Id == orderId);

            var result = await _payment.Request(new DtoRequest
            {
                Mobile = o.UserAddress.Mobile,
                CallbackUrl = string.Format("{0}://{1}/checkout/finish/"+orderId, Request.Scheme,Request.Host),
                Description = "خرید",
                Email = "hosseinhanifeh@gmail.com",
                Amount = (int)o.OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice()),
                MerchantId = configuration["PaymentSetting:MerchantId"],
            },isSandbox==true? ZarinPal.Class.Payment.Mode.sandbox :ZarinPal.Class.Payment.Mode.zarinpal);
            if (result.Status == 100)
            {
                return Redirect((isSandbox == true ? configuration["PaymentSetting:SandboxUrl"] : configuration["PaymentSetting:PaymentUrl"]) +result.Authority);
            }
            return RedirectToPage("Error");
        }
    }
}
