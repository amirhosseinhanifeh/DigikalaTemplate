using ALO.Common.Utilities.Generate;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Order;
using ALO.DomainClasses.EntityHelpers;
using Dto.Payment;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ZarinPal.Class;

namespace Ghaleb.Web.Pages.Checkout
{
    public class PaymentModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly Payment _payment;
        private readonly IConfiguration _configuration;
        public PaymentModel(ServiceContext context, IConfiguration configuration)
        {
            _context = context;
            var expose = new Expose();
            _payment = expose.CreatePayment();
            _configuration = configuration;
        }
        public List<ResponseGetBasketItems> List { get; set; } = new List<ResponseGetBasketItems>();
        public decimal TotalPrice { get; set; }
        public decimal DeliverPrice { get; set; } = 0;
        public decimal PaymentPrice { get; set; } = 0;
        public tbl_UserAddresses Address { get; set; }
        public async Task OnGetAsync()
        {
            var res = Request.Cookies["basket"];
            var addressId = long.Parse(Request.Cookies["address"]);
            var useraddress = await _context.tbl_UserAddresses.FirstOrDefaultAsync(x => x.Id == addressId);
            Address = useraddress;
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);
            foreach (var item in list)
            {

                var pr = await _context.tbl_ProductPriceHistory.Include(x => x.Product).ThenInclude(x => x.Image).FirstOrDefaultAsync(x => x.Id == item.Id);

                List.Add(new ResponseGetBasketItems
                {
                    Count = item.Count,
                    Price = pr.GetPrice(),
                    Id = item.Id,
                    Image = pr.Product.Image.BindImage(_configuration),
                    Name = pr.Product.Title,
                    TotalPrice = pr.GetPrice() * item.Count
                });
            }
            TotalPrice = List.Sum(x => x.Price * x.Count);
            PaymentPrice = TotalPrice + DeliverPrice;
        }
        public async Task<IActionResult> OnPostAsync()
        {
            var addressId = long.Parse(Request.Cookies["address"]);

            var res = Request.Cookies["basket"];
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);
            var data = new tbl_Order
            {
                OrderCode = Generate.GenerateCode(5),
                UserId = User.UserId(),
                OrderState = OrderState.PENDING,
                UserAddressId = addressId,
                OrderDetails = new List<tbl_OrderDetails>()
            };
            foreach (var item in list)
            {
                data.OrderDetails.Add(new tbl_OrderDetails
                {
                    ProductPriceHistoryId = item.Id,
                    Count = item.Count,
                });

            }
            await _context.tbl_Orders.AddAsync(data);
            var i = await _context.SaveChangesAsync();

            return RedirectToPage("Pay", new { orderId = data.Id });
        }
    }
}
