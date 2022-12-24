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
        public PayModel(ServiceContext context)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
        }
        public async Task<IActionResult> OnGetAsync(long orderId)
        {
            var o = await _context.tbl_Orders.Include(x=>x.User).Include(x => x.UserAddress).Include(x => x.OrderDetails).ThenInclude(x => x.ProductPriceHistory).FirstOrDefaultAsync(x => x.Id == orderId);

            var result = await _payment.Request(new DtoRequest
            {
                Mobile = o.UserAddress.Mobile,
                CallbackUrl = string.Format("{0}://{1}/checkout/finish/"+orderId, Request.Scheme,
            Request.Host),
                Description = "خرید",
                Email = "hosseinhanifeh@gmail.com",
                Amount = (int)o.OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice()),
                MerchantId = "37b2d480-b4c0-44d6-921c-26e588592f32",
            }, ZarinPal.Class.Payment.Mode.sandbox);
            if (result.Status == 100)
            {
                return Redirect($"https://sandbox.zarinpal.com/pg/StartPay/{result.Authority}");
            }
            return RedirectToPage("Error");
        }
    }
}
