using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;
using ZarinPal.Class;
using static System.Net.Mime.MediaTypeNames;

namespace Ghaleb.Web.Pages.Checkout
{
    public class FinishModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly Payment _payment;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        public FinishModel(ServiceContext context, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }
        public bool Status { get; set; } = false;
        public string Message { get; set; }
        public string OrderCode { get; set; }
        public async Task OnGetAsync(long id, string authority, string Status)
        {
            var order = await _context.tbl_Orders
                .Include(x => x.Bank)
                .Include(x => x.OrderStateHistories)
                .Include(x => x.DeliveryPrice)
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.ProductPriceHistory)
                .FirstOrDefaultAsync(x => x.Id == id);
            var price = (int)order.TotalPrice();
            var verification = await VerifyPaymentAsync(new VerifyZarinpalRequest
            {
                amount = price,
                authority = authority,
                merchant_id = order.Bank.MerchantId
            });
            if (verification == null)
            {
                Message = "خطا در پرداخت";
            }
            else if (verification.data.code == 100)
            {
                order.PaymentMethod = PaymentMethod.INTERNET;
                order.OrderStateHistories.Add(new tbl_OrderStateHistory
                {
                    OrderState = OrderState.PAYED
                });
                await _context.SaveChangesAsync();
                this.Status = true;
                Message = "پرداخت انجام شد";
                OrderCode = order.OrderCode;
                Response.Cookies.Delete("basket", new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(-1)
                });
            }
            else if (verification.data.code == -21)
            {
                Message = "لغو پرداخت";
            }
            else if (verification.data.code == 101)
            {
                Message = "شما قبلا این فاکتور را پرداخت کردید";
            }
            else
            {

            }


        }
        private async Task<VerifyZarinpalResponse> VerifyPaymentAsync(VerifyZarinpalRequest model)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://api.zarinpal.com/pg/v4/payment/");
            var content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, Application.Json);
            var response = await client.PostAsync("verify.json", content);
            var r = await response.Content.ReadAsStringAsync();
            var d = JToken.Parse(r)["data"];
            if (d is JObject)
            {
                return JsonConvert.DeserializeObject<VerifyZarinpalResponse>(r);

            }
            return null;

        }
        public class VerifyZarinpalRequest
        {
            public string merchant_id { get; set; }
            public int amount { get; set; }
            public string authority { get; set; }
        }
        public class Data
        {
            public int code { get; set; }
            public string message { get; set; }
            public string card_hash { get; set; }
            public string card_pan { get; set; }
            public int ref_id { get; set; }
            public string fee_type { get; set; }
            public int fee { get; set; }
        }

        public class VerifyZarinpalResponse
        {
            public Data data { get; set; }
        }

    }
}
