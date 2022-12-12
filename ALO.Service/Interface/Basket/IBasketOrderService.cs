using ALO.ViewModels.Basket;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Basket
{
    public interface IBasketOrderService
    {

        Task<ListResultViewModel<GetBasketOrderDto>> GetBasketById(long id);
        Task<ListResultViewModel<GetBasketOrderDto>> GetBasketByUserId(long UserId);
        Task<ListResultViewModel<GetBasketListForHome>> GetAllBaskets(long UserId);
        Task<ListResultViewModel<bool>> AddProductToBasket(long ProductId,long UserId);
        Task<ListResultViewModel<bool>> DeleteProductFromBasket(long Id);
    }
}
