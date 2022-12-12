using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Order
{
    public class tbl_Order:BaseEntity
    {
        public long UserId { get; set; }
        public tbl_Users User{ get; set; }
        public string OrderCode { get; set; }
        public OrderState OrderState{ get; set; }
        public long? UserAddressId { get; set; }
        public tbl_UserAddresses UserAddress { get; set; }
        public ICollection<tbl_OrderDetails> OrderDetails { get; set; }
    }
    public class tbl_OrderDetails : BaseEntity
    {
        public long ProductPriceHistoryId { get; set; }
        public tbl_ProductPriceHistory ProductPriceHistory{ get; set; }
        public long OrderId { get; set; }
        public tbl_Order Order{ get; set; }
        public int Count { get; set; }

    }
    public enum OrderState
    {
        PENDING,
        PAYED
    }
}
