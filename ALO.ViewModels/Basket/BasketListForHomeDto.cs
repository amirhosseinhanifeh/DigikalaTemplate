using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Basket
{
    public class GetBasketListForHome
    {
        public string TotalPrice { get; set; }
        public List<GetProductBasketListForHomeDto> Products { get; set; }
    }
    public class GetProductBasketListForHomeDto
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string UnitPrice { get; set; }

    }
    public class AddBasketForHomeDtO
    {
        public long Id { get; set; }
        public long ProductPriceHistoryId { get; set; }
        public string Title { get; set; }
        public int Count { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
    }
}
