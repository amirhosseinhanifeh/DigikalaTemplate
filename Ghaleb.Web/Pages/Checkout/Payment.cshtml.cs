using ALO.Common.Utilities.Generate;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Discount;
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
        public decimal? DiscountPrice { get; set; }
        public tbl_UserAddresses Address { get; set; }
        public tbl_Discount Discount { get; set; }

        public async Task OnGetAsync()
        {
            await LoadDataAsync();
        }
        public async Task LoadDataAsync()
        {
            List = new List<ResponseGetBasketItems>();
            var res = Request.Cookies["basket"];
            var addressId = long.Parse(Request.Cookies["address"]);
            var useraddress = await _context.tbl_UserAddresses.FirstOrDefaultAsync(x => x.Id == addressId);
            Address = useraddress;
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);
            var ids = list.Select(h => h.Id);
            var prs = await _context.tbl_ProductPriceHistory.Include(x => x.Product).ThenInclude(x => x.Image).Where(h => ids.Contains(h.Id)).ToListAsync();
            foreach (var item in prs)
            {
                var count = list.FirstOrDefault(h => h.Id == item.Id);
                List.Add(new ResponseGetBasketItems
                {
                    Count = count.Count,
                    Price = item.GetPrice(),
                    Id = item.Id,
                    Image = item.Product.Image.BindImage(_configuration),
                    Name = item.Product.Title,
                    TotalPrice = item.GetPrice() * count.Count
                });
            }
            TotalPrice = List.Sum(x => x.Price * x.Count);

            if (Discount != null)
            {
                var prev = (TotalPrice + DeliverPrice);
                DiscountPrice = (prev * (decimal)Discount.Percent) / 100;
                PaymentPrice = prev - DiscountPrice.Value;
            }
            else
            {
                PaymentPrice = TotalPrice + DeliverPrice;
            }
        }
        public async Task OnPostDiscountAsync(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                var discount = await _context.tbl_Discounts.AsNoTracking().Include(x => x.Orders).FirstOrDefaultAsync(h => h.Code == code && h.UseCount > h.Orders.Count());
                if (discount != null)
                {
                    Discount = discount;
                }
            }
            await LoadDataAsync();
        }
        public async Task<IActionResult> OnPostAsync(long? discountId)
        {
            var addressId = long.Parse(Request.Cookies["address"]);

            var res = Request.Cookies["basket"];
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);
            var data = new tbl_Order
            {
                OrderCode = Generate.GenerateCode(5),
                UserId = User.UserId(),
                UserAddressId = addressId,
                DiscountId = discountId,
                OrderDetails = new List<tbl_OrderDetails>(),
                OrderStateHistories = new List<tbl_OrderStateHistory>()
            };
            data.OrderStateHistories.Add(new tbl_OrderStateHistory
            {
                OrderState = OrderState.CREATED
            });
            data.OrderStateHistories.Add(new tbl_OrderStateHistory
            {
                OrderState = OrderState.PENDING
            });
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
