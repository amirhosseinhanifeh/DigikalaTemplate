using System;
using System.Collections.Generic;

namespace ALO.ViewModels.Basket
{
    public class GetBasketOrderDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public List<AddBasketForHomeDtO> BasketProducts{ get; set; }

    }
}
