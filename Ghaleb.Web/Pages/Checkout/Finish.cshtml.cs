using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Dto.Payment;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ZarinPal.Class;

namespace Ghaleb.Web.Pages.Checkout
{
    public class FinishModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly Payment _payment;
        public FinishModel(ServiceContext context)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
        }
        public string Message { get; set; }
        public string OrderCode { get; set; }
        public async Task OnGetAsync(long id, string authority,string Status)
        {
            if(Status!="OK")
            {
                Message = "پرداخت انجام نشد";
                return;
            }
            var order = await _context.tbl_Orders.Include(x => x.OrderDetails).ThenInclude(x => x.ProductPriceHistory).FirstOrDefaultAsync(x => x.Id == id);
            var price = (int)order.OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice());
            var verification = await _payment.Verification(new DtoVerification
            {
                MerchantId = "37b2d480-b4c0-44d6-921c-26e588592f32",
                Authority = authority,
                Amount = price,
            }, Payment.Mode.zarinpal);
            if (verification.Status == 100)
            {

                order.OrderState = OrderState.PAYED;
                await _context.SaveChangesAsync();
            }
            Message = "پرداخت انجام شد";
            OrderCode = order.OrderCode;
            Response.Cookies.Delete("basket", new CookieOptions
            {
                Expires=DateTime.Now.AddDays(-1)
            });

        }
    }
}
