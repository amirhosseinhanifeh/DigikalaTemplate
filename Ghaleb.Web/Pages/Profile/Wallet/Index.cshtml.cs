using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Wallet;
using Dto.Payment;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using static FusionCharts.DataEngine.SortColumn;
using ZarinPal.Class;

namespace Ghaleb.Web.Pages.Profile.Wallet
{
    public class IndexModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly Payment _payment;
        private readonly IConfiguration configuration;
        public IndexModel(ServiceContext context, IConfiguration configuration)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
            this.configuration = configuration;
        }
        public tbl_Wallet Wallet { get; set; }
        public async Task OnGet()
        {

            Wallet = await _context.tbl_Wallets.Include(x => x.WalletHistories).FirstOrDefaultAsync(h => h.UserId == User.UserId());
        }
        public async Task<IActionResult> OnPost(decimal Cost)
        {

            var isSandbox = Convert.ToBoolean(configuration["PaymentSetting:IsSandbox"]);
            var mobile = User.FindFirst("MobilePhone")?.Value;
            var result = await _payment.Request(new DtoRequest
            {
                Mobile = mobile,
                CallbackUrl = string.Format("{0}://{1}/profile/wallet/finish?amount="+Cost, Request.Scheme, Request.Host),
                Description = "شارژ کیف پول",
                Email = "hosseinhanifeh@gmail.com",
                Amount = (int)Cost,
                MerchantId = configuration["PaymentSetting:MerchantId"],
            }, isSandbox == true ? Payment.Mode.sandbox : Payment.Mode.zarinpal);
            if (result.Status == 100)
            {
                return Redirect((isSandbox == true ? configuration["PaymentSetting:SandboxUrl"] : configuration["PaymentSetting:PaymentUrl"]) + result.Authority);
            }

            return RedirectToPage("Error");


        }

    }
}
