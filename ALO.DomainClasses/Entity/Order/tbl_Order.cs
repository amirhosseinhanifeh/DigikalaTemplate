using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Discount;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Order
{
    public class tbl_Order : BaseEntity
    {

        public string OrderCode { get; set; }

        public PaymentMethod PaymentMethod { get; set; }

        public DateTime SentDate { get; set; }

        public string SentTime { get; set; }

        public long? DeliveryPriceId { get; set; }
        public tbl_DeliveryPrice DeliveryPrice { get; set; }

        public long? UserAddressId { get; set; }
        public tbl_UserAddresses UserAddress { get; set; }

        public long? DiscountId { get; set; }
        public tbl_Discount Discount { get; set; }

        public long UserId { get; set; }
        public tbl_Users User { get; set; }

        public ICollection<tbl_OrderDetails> OrderDetails { get; set; }
        public ICollection<tbl_OrderStateHistory> OrderStateHistories { get; set; }

        public decimal TotalPrice()
        {
            if (Discount != null)
            {
               return CalculateDiscount();
            }
            return Total();

        }
        private decimal Total()
        {
            return OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice()) + (DeliveryPrice != null ? DeliveryPrice.GetCost(OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice())) : 0);
        }
        public decimal CalculateDiscount()
        {
            return Total() -(Total() * (decimal)Discount.Percent) / 100;
        }
    }
}
