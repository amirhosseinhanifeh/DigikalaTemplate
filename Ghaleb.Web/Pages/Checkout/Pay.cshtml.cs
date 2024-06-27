using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text;
using ZarinPal.Class;
using static System.Net.Mime.MediaTypeNames;

namespace Ghaleb.Web.Pages.Checkout
{
    public class PayModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly Payment _payment;
        private readonly IHttpClientFactory _httpClientFactory;
        public PayModel(ServiceContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
            _httpClientFactory = httpClientFactory;
        }
        public async Task<IActionResult> OnGetAsync(long orderId)
        {


            var o = await _context.tbl_Orders
                .Include(x => x.Bank)
                .Include(x => x.OrderStateHistories)
                .Include(x => x.DeliveryPrice)
                .Include(x => x.User)
                .Include(x => x.Discount)
                .Include(x => x.UserAddress)
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.ProductPriceHistory)
                .FirstOrDefaultAsync(x => x.Id == orderId);

            if (o.PaymentMethod == PaymentMethod.INTERNET)
            {
                var user = await _context.tbl_Users.FindAsync(User.UserId());

                if (o.Bank.BankType == ALO.DomainClasses.Entity.BankSetting.BankType.ZARINPAL)
                {
                    var payment = await CreatePaymentAsync(new RequestPaymentDto
                    {
                        amount = (int)o.TotalPrice(),
                        callback_url = string.Format("{0}://{1}/checkout/finish/" + orderId, Request.Scheme, Request.Host),
                        description = "خرید",
                        merchant_id = o.Bank.MerchantId,
                        metadata = new Metadata
                        {
                            email = user.Email,
                            mobile = o.UserAddress.Mobile
                        }
                    });
                    if (payment.data.code == 100)
                    {
                        return Redirect((o.Bank.IsSandbox == true ? o.Bank.SandBoxUrl : o.Bank.PaymentUrl) + payment.data.authority);
                    }
                }
                else
                {
                    return Redirect("~/");
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
        private async Task<ZarinPalpaymentResponse?> CreatePaymentAsync(RequestPaymentDto model)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://api.zarinpal.com/pg/v4/payment/");
            var content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, Application.Json);
            var response = await client.PostAsync("request.json", content);
            return JsonConvert.DeserializeObject<ZarinPalpaymentResponse>(await response.Content.ReadAsStringAsync());
        }
    }
    public class Metadata
    {
        public string mobile { get; set; }
        public string email { get; set; }
    }

    public class RequestPaymentDto
    {
        public string merchant_id { get; set; }
        public int amount { get; set; }
        public string callback_url { get; set; }
        public string description { get; set; }
        public Metadata metadata { get; set; }
    }

    public class Data
    {
        public int code { get; set; }
        public string message { get; set; }
        public string authority { get; set; }
        public string fee_type { get; set; }
        public int fee { get; set; }
    }

    public class ZarinPalpaymentResponse
    {
        public Data data { get; set; }
        public List<object> errors { get; set; }
    }
}
