using ALO.DomainClasses.Entity.Product;

namespace ALO.DomainClasses.Entity.Order
{
    public class tbl_OrderDetails : BaseEntity
    {
        public long ProductPriceHistoryId { get; set; }
        public tbl_ProductPriceHistory ProductPriceHistory{ get; set; }
        public long OrderId { get; set; }
        public tbl_Order Order{ get; set; }
        public int Count { get; set; }

    }
}
