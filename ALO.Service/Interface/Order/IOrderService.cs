using ALO.ViewModels.Order;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Order
{
    public interface IOrderService
    {
        Task<ListResultViewModel<bool>> CreateAsync(long BasketId);
        Task<ListResultViewModel<IEnumerable<GetUserOrderListDTO>>> GetUserOrdersAsync(long UserId);
    }
}
