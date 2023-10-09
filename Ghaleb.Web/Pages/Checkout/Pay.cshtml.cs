using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Dto.Payment;
using Ghaleb.Web.Helpers;
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

            var isSandbox = Convert.ToBoolean(configuration["PaymentSetting:IsSandbox"]);
            var o = await _context.tbl_Orders
                .Include(x => x.OrderStateHistories)
                .Include(x => x.DeliveryPrice)
                .Include(x => x.User)
                .Include(x=>x.Discount)
                .Include(x => x.UserAddress)
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.ProductPriceHistory)
                .FirstOrDefaultAsync(x => x.Id == orderId);

            if (o.PaymentMethod == PaymentMethod.INTERNET)
            {
                var user = await _context.tbl_Users.FindAsync(User.UserId());
                var result = await _payment.Request(new DtoRequest
                {
                    Mobile = o.UserAddress.Mobile,
                    CallbackUrl = string.Format("{0}://{1}/checkout/finish/" + orderId, Request.Scheme, Request.Host),
                    Description = "خرید",
                    Email = user.Email,
                    Amount = (int)o.TotalPrice(),
                    MerchantId = configuration["PaymentSetting:MerchantId"],
                }, isSandbox == true ? ZarinPal.Class.Payment.Mode.sandbox : ZarinPal.Class.Payment.Mode.zarinpal);
                if (result.Status == 100)
                {
                    return Redirect((isSandbox == true ? configuration["PaymentSetting:SandboxUrl"] : configuration["PaymentSetting:PaymentUrl"]) + result.Authority);
                }
            }
            else
            {
                var wallet = await _context.tbl_Wallets.FirstOrDefaultAsync(h => h.UserId == User.UserId());
                if (wallet.Cost > o.TotalPrice())
                {
                    wallet.Cost -= o.TotalPrice();
                    o.PaymentMethod = PaymentMethod.WALLET;
                    o.OrderStateHistories.Add(new tbl_OrderStateHistory
                    {
                        OrderState = OrderState.PAYED
                    });

                    await _context.SaveChangesAsync();
                    Response.Cookies.Delete("basket", new CookieOptions
                    {
                        Expires = DateTime.Now.AddDays(-1)
                    });
                    return RedirectToPage("WalletFinish", new { StatusCode = "200" });
                }
                else
                {
                    return RedirectToPage("WalletFinish", new { StatusCode = "501" });

                }

            }
            return RedirectToPage("Error", new { statusCode = "-101" });
        }
    }
}
