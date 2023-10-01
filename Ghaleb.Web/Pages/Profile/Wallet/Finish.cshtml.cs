using ALO.Common.Messages;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using ALO.DomainClasses.Entity.Wallet;
using Dto.Payment;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ZarinPal.Class;

namespace Ghaleb.Web.Pages.Profile.Wallet
{
    public class FinishModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly Payment _payment;
        private readonly IConfiguration _configuration;
        public FinishModel(ServiceContext context, IConfiguration configuration)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
            _configuration = configuration;
        }
        public bool Status { get; set; } = false;
        public string Message { get; set; }
        public string OrderCode { get; set; }
        public async Task OnGetAsync(decimal amount, string authority)
        {
            var isSandbox = Convert.ToBoolean(_configuration["PaymentSetting:IsSandbox"]);



            var verification = await _payment.Verification(new DtoVerification
            {
                MerchantId = "37b2d480-b4c0-44d6-921c-26e588592f32",
                Authority = authority,
                Amount = (int)amount,
            }, isSandbox == true ? Payment.Mode.sandbox : Payment.Mode.zarinpal);
            if (verification.Status == 100)
            {

                var wallet =await _context.tbl_Wallets.Include(x=>x.WalletHistories).FirstOrDefaultAsync(x => x.UserId == User.UserId());
                wallet.Cost += amount;
                wallet.WalletHistories.Add(new tbl_WalletHistory
                {
                    Cost = amount,

                });
                await _context.SaveChangesAsync();
                this.Status = true;
                Message = "پرداخت انجام شد";
            }
            else if (verification.Status == -21)
            {
                Message = "لغو پرداخت";
            }
            else if (verification.Status == 101)
            {
                Message = "شما قبلا این فاکتور را پرداخت کردید";
            }
            else if (verification.Status == -11)
            {
                Message = "خطا در پرداخت";
            }
            else
            {

            }


        }
    }
}
