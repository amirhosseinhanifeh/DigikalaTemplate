using ALO.Common.Utilities.Generate;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Order;
using ALO.DomainClasses.EntityHelpers;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using static FusionCharts.DataEngine.SortColumn;

namespace Ghaleb.Web.Pages.Checkout
{
    [Authorize]
    public class AddressModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly IConfiguration _configuration;

        public AddressModel(ServiceContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public List<tbl_UserAddresses> Addresses { get; set; }
        public ResponseOrder Order { get; set; }
        public async Task OnGetAsync()
        {
            Addresses = await _context.tbl_UserAddresses.Where(x => x.UserId == User.UserId() && x.IsDelete == false).ToListAsync();

            var res = Request.Cookies["basket"];
            if (res == null)
                return;
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);

            List<ResponseGetBasketItems> List = new List<ResponseGetBasketItems>();
            foreach (var item in list)
            {

                var pr = await _context.tbl_ProductPriceHistory.Include(x => x.Color).Include(x => x.Product).ThenInclude(x => x.Image).FirstOrDefaultAsync(x => x.Id == item.Id);

                List.Add(new ResponseGetBasketItems
                {
                    Count = item.Count,
                    Price = pr.GetPrice(),
                    Id = item.Id,
                    Image = pr.Product.Image.BindImage(_configuration),
                    Name = pr.Product.Title + (pr.Color != null ? "(" + pr.Color.Name + ")" : null),
                    TotalPrice = pr.GetPrice() * item.Count
                });
            }
            var delivery = await _context.tbl_DeliveryPrices.OrderBy(x => x.Id).LastOrDefaultAsync();

            Order = new ResponseOrder()
            {
                DeliveryPrice = delivery.GetCost(List.Sum(h => h.TotalPrice)),
                Items = List,
                ProductPrices = List.Sum(h => h.TotalPrice),
                TotalPrice = delivery.GetCost(List.Sum(h => h.TotalPrice)) + List.Sum(h => h.TotalPrice),
                DeliveryId=delivery.Id,
            };
        }
        public IActionResult OnPost(long addressId)
        {
            Response.Cookies.Append("Address", addressId.ToString());
            return RedirectToPage("/checkout/payment");
        }
        public async Task<IActionResult> OnPostCreateAddress(RequestAddAddressDto model)
        {
            var data = new tbl_UserAddresses
            {
                Address = model.Address,
                Lat = model.Lat,
                Long = model.Lng,
                Mobile = model.Mobile,
                Phone = model.Phone,
                UserId = User.UserId().GetValueOrDefault(),
                Pelak = model.Pelak,
                Vahed = model.Vahed,
                IsDefault = false

            };
            await _context.tbl_UserAddresses.AddAsync(data);
            await _context.SaveChangesAsync();
            return RedirectToPage("Address");
        }
        public async Task<IActionResult> OnPostPayAsync(long addressId,long? deliveryPriceId,string time , PaymentMethod payType = 0)
        {

            var res = Request.Cookies["basket"];
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);

            var data = new tbl_Order
            {
                OrderCode = Generate.GenerateCode(5),
                UserId = User.UserId().GetValueOrDefault(),
                UserAddressId = addressId,
                PaymentMethod=payType,
                DeliveryPriceId=deliveryPriceId.GetValueOrDefault(),
                SentDate = DateTime.Parse(time.Split(";")[0]),
                SentTime= time.Split(";")[1],
                OrderDetails = new List<tbl_OrderDetails>(),
                OrderStateHistories= new List<tbl_OrderStateHistory>()
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
        public async Task<IActionResult> OnGetDelete(long Id)
        {
            var res = await _context.tbl_UserAddresses.FirstOrDefaultAsync(h => h.Id == Id);

            _context.SoftDeletedBaseEntity(res);
            await _context.SaveChangesAsync();
            return RedirectToPage("Address");
        }
    }
    public class RequestAddAddressDto
    {
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Pelak { get; set; }
        public int Vahed { get; set; }

    }
}
