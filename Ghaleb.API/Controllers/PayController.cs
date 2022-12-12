using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.Common.Utilities.Generate;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using ALO.Service.Interface.Basket;
using ALO.Service.Interface.Order;
using Dto.Payment;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ZarinPal.Class;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PayController : ControllerBase
    {
        private readonly Payment _payment;
        private readonly Authority _authority;
        private readonly Transactions _transactions;
        private readonly IBasketOrderService _basket;
        private readonly IOrderService _orderService;
        private readonly ServiceContext _context;
        public PayController(IBasketOrderService basket,
            IOrderService orderService,
            ServiceContext context)
        {
            var expose = new Expose();
            _payment = expose.CreatePayment();
            _authority = expose.CreateAuthority();
            _transactions = expose.CreateTransactions();
            _basket = basket;
            _orderService = orderService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(long userAddressId,[FromBody] BasketDto[] model)
        {
            var data = new tbl_Order
            {
                OrderCode = Generate.GenerateCode(5),
                UserId = User.UserId(),
                OrderState = OrderState.PENDING,
                UserAddressId=userAddressId,
                OrderDetails = new List<tbl_OrderDetails>()
            };
            foreach (var item in model)
            {
                data.OrderDetails.Add(new tbl_OrderDetails
                {
                    ProductPriceHistoryId = item.Id,
                    Count = item.Count,
                });

            }
            await _context.tbl_Orders.AddAsync(data);
            var i = await _context.SaveChangesAsync();
            return Ok(data.Id);
        }
        [HttpGet]
        public async Task<IActionResult> Pay(long orderId, string callbackUrl)
        {
            try
            {

                    var userId = 2;
                var order = await _context.tbl_Orders
                    .Include(x=>x.UserAddress)
                    .Include(x=>x.OrderDetails)
                    .ThenInclude(x=>x.ProductPriceHistory)
                    .FirstOrDefaultAsync(x=>x.Id==orderId);
                var price = (int)order.OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice());
                    if (order != null)
                    {
                        var result = await _payment.Request(new DtoRequest
                        {
                            Mobile = order.UserAddress.Mobile,
                            CallbackUrl = callbackUrl,
                            Description = "خرید",
                            Email = "hosseinhanifeh@gmail.com",
                            Amount = price,
                            MerchantId = "37b2d480-b4c0-44d6-921c-26e588592f32",
                        }, ZarinPal.Class.Payment.Mode.zarinpal);
                        if (result.Status == 100)
                        {
                            return Ok(new {Url= $"https://zarinpal.com/pg/StartPay/{result.Authority}" 
                            } );
                        }
                   
                }
                return Ok(new { Data = "", message = "خطا", Status = Status.Failed, NotificationType.error });

            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        [HttpGet]
        public async Task<IActionResult> Validate(long id, string authority)
        {
            var order = await _context.tbl_Orders.Include(x => x.OrderDetails).ThenInclude(x => x.ProductPriceHistory).FirstOrDefaultAsync(x => x.Id == id);
            var price = (int)order.OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice());
            var verification = await _payment.Verification(new DtoVerification
            {
                MerchantId = "37b2d480-b4c0-44d6-921c-26e588592f32",
                Authority = authority,
                Amount= price,
            }, Payment.Mode.zarinpal);
            if (verification.Status == 100)
            {

                order.OrderState = OrderState.PAYED;
                await _context.SaveChangesAsync();
                return Ok(true);
            }
            return Ok(false);
        }
        public class BasketDto
        {
            public long Id { get; set; }
            public int Count { get; set; }
        }
    }
}
