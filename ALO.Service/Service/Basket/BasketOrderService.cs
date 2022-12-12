using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Basket;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Basket;
using ALO.ViewModels.Basket;
using ALO.ViewModels.Result;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.Basket
{
    public class BasketOrderService : IBasketOrderService
    {
        private readonly ServiceContext _db;

        public BasketOrderService(ServiceContext db)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<bool>> AddProductToBasket(long ProductPriceHistoryId, long UserId)
        {
            try
            {
                var basketOrder = await _db.GetAsync<tbl_BasketOrder>(x => x.UserId == UserId, includes: new string[] { "BasketOrderProducts" });
                if (basketOrder == null)
                {
                    basketOrder = new tbl_BasketOrder();
                    basketOrder.UserId = UserId;
                    basketOrder.BasketOrderProducts = new List<tbl_BasketOrderProducts>();
                    _db.Create(basketOrder);
                    await _db.SaveChangesAsync();
                }
                if (!basketOrder.BasketOrderProducts.Any(y => y.ProductPriceHistoryId == ProductPriceHistoryId))
                {
                    _db.Create(new tbl_BasketOrderProducts
                    {
                        ProductPriceHistoryId=ProductPriceHistoryId,
                        Count = 1,
                        BasketOrderId = basketOrder.Id
                    });
                    await _db.SaveChangesAsync();
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
                        Message = ExistMessage,
                        NotificationType = NotificationType.warning,
                        Status = Status.Success
                    };
                }
            }
            catch (Exception e)
            {
                return new ListResultViewModel<bool>
                {
                    Message = e.Message,
                    model = false,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<bool>> DeleteProductFromBasket(long Id)
        {
            try
            {
                var result = (await _db.GetAsync<tbl_BasketOrderProducts>(x => x.Id == Id));

                _db.Delete(result);
                await _db.SaveChangesAsync();
                return new ListResultViewModel<bool>
                {
                    model = true,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
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

        public async Task<ListResultViewModel<GetBasketListForHome>> GetAllBaskets(long UserId)
        {
            try
            {
                var result = (await _db.GetAsync<tbl_BasketOrder>(x => x.UserId == UserId, new string[] { "BasketOrderProducts", "BasketOrderProducts.Product", "BasketOrderProducts.Product.Image" }));

                var query = new GetBasketListForHome
                {

                    TotalPrice = result.BasketOrderProducts.Sum(y => y.ProductPriceHistory.GetPrice()).ToString("n0").toPersianNumber() + " تومان",
                    Products = result.BasketOrderProducts.Select(y => new GetProductBasketListForHomeDto
                    {
                        Id = result.Id,
                        ProductId = y.ProductPriceHistory.ProductId,
                        Title = y.ProductPriceHistory.Product.Title,
                        Image = y.ProductPriceHistory.Product.Image.BindImage(),
                        UnitPrice = y.ProductPriceHistory.GetPrice() + " تومان",

                    }).ToList()
                };
                return new ListResultViewModel<GetBasketListForHome>
                {
                    model = query,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<GetBasketListForHome>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<GetBasketOrderDto>> GetBasketById(long Id)
        {
            try
            {
                var result = (await _db.GetAsync<tbl_BasketOrder>(x => x.Id == Id, new string[] { "BasketOrderProducts.Product", "BasketOrderProducts.Product.Image" }));
                var query = new GetBasketOrderDto
                {
                    Id = result.Id,
                    UserId = result.UserId,
                    BasketProducts = result.BasketOrderProducts.Select(y => new AddBasketForHomeDtO
                    {
                        ProductPriceHistoryId = y.ProductPriceHistoryId,
                        Image = y.ProductPriceHistory.Product.Image.BindImage(),
                        Title = y.ProductPriceHistory.Product.Title,
                        Price = y.ProductPriceHistory.GetPrice(),
                        Id = y.Id
                    }).ToList()
                };
                return new ListResultViewModel<GetBasketOrderDto>
                {
                    model = query,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<GetBasketOrderDto>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<GetBasketOrderDto>> GetBasketByUserId(long UserId)
        {
            try
            {
                var result = (await _db.GetAsync<tbl_BasketOrder>(x => x.UserId == UserId, new string[] { "BasketOrderProducts.Product", "BasketOrderProducts.Product.Image" }));
                var query = new GetBasketOrderDto
                {
                    Id = result.Id,
                    UserId = result.UserId,
                    BasketProducts = result.BasketOrderProducts.Select(y => new AddBasketForHomeDtO
                    {
                        ProductPriceHistoryId = y.ProductPriceHistoryId,
                        Image = y.ProductPriceHistory.Product.Image.BindImage(),
                        Title = y.ProductPriceHistory.Product.Title,
                        Price = y.ProductPriceHistory.GetPrice(),
                        Id = y.Id
                    }).ToList()
                };
                return new ListResultViewModel<GetBasketOrderDto>
                {
                    model = query,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<GetBasketOrderDto>
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
