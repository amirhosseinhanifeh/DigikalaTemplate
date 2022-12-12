using ALO.DomainClasses.Entity.Product;
using System;

namespace ALO.DomainClasses.Entity.Basket
{
    public class tbl_BasketOrderProducts:BaseEntity
    {

        public long ProductPriceHistoryId { get; set; }
        public tbl_ProductPriceHistory ProductPriceHistory { get; set; }
        public int Count { get; set; }

        public long BasketOrderId { get; set; }
        public tbl_BasketOrder BasketOrder { get; set; }
    }
}
