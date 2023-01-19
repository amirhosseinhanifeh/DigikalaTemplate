using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.Common.Utilities.Generate;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Basket;
using ALO.Service.Interface.Order;
using ALO.ViewModels.Order;
using ALO.ViewModels.Result;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.Order
{
    public class OrderService : IOrderService
    {
        private readonly ServiceContext _context;
        private readonly IBasketOrderService _basketOrderService;
        private readonly IConfiguration _configuration;
        public OrderService(ServiceContext context,
            IBasketOrderService basketOrderService,
            IConfiguration configuration)
        {
            _context = context;
            _basketOrderService = basketOrderService;
            _configuration = configuration;
        }
        public async Task<ListResultViewModel<bool>> CreateAsync(long BasketId)
        {
            try
            {
                var baskets = await _basketOrderService.GetBasketById(BasketId);

                if (baskets.model.BasketProducts.Any())
                {
                    var result = _context.Create(new tbl_Order
                    {
                        OrderCode = Generate.GenerateCode(5),
                        UserId = baskets.model.UserId,
                        OrderState = OrderState.PAYED,
                        OrderDetails = new List<tbl_OrderDetails>()
                    });

                    await _context.SaveChangesAsync();
                    List<tbl_OrderDetails> orderDetails = new List<tbl_OrderDetails>();
                    foreach (var item in baskets.model.BasketProducts)
                    {
                        orderDetails.Add(new tbl_OrderDetails
                        {
                            ProductPriceHistoryId = item.ProductPriceHistoryId,
                            Count = item.Count,
                            OrderId = result.Id
                        });

                    }
                    _context.AddRange(orderDetails);
                    var i = await _context.SaveChangesAsync();
                    if (i == 1)
                    {
                        var bask = _context.tbl_BasketOrders.Find(BasketId);
                        _context.tbl_BasketOrders.Remove(bask);
                        await _context.SaveChangesAsync();
                    }
                    return new ListResultViewModel<bool>
                    {
                        model = true,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                else
                {
                    return new ListResultViewModel<bool>
                    {
                        model = false,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
            }
            catch (Exception e)
            {
                return new ListResultViewModel<bool>
                {
                    Message = FailMessage,
                    model = false,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<IEnumerable<GetUserOrderListDTO>>> GetUserOrdersAsync(long UserId)
        {
            try
            {
                var result =await  _context.GetAllAsync<tbl_OrderDetails>(x=>x.Order.UserId==UserId, new string[] { "Product", "Product.File", "Product.Image", "Order" })
                             .Select(x => new GetUserOrderListDTO
                             {
                                 OrderCode=x.Order.OrderCode,
                                 Count=x.Count,
                                 DownloadFile=x.ProductPriceHistory.Product.File.BindFile(),
                                 ProductImage=x.ProductPriceHistory.Product.Image.BindImage(_configuration),
                                 Title=x.ProductPriceHistory.Product.Title,
                                 UnitPrice=x.ProductPriceHistory.GetPriceValue()

                             }).ToListAsync();
                return new ListResultViewModel<IEnumerable<GetUserOrderListDTO>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<GetUserOrderListDTO>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
    }
}
