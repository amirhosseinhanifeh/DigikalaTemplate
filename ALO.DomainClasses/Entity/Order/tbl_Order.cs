using ALO.DomainClasses.Entity.Account;
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
        public long UserId { get; set; }
        public tbl_Users User { get; set; }
        public string OrderCode { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public long? UserAddressId { get; set; }

        public long? DeliveryPriceId { get; set; }
        public tbl_DeliveryPrice DeliveryPrice { get; set; }
		public DateTime SentDate { get; set; }
		public string SentTime { get; set; }


        public tbl_UserAddresses UserAddress { get; set; }
        public ICollection<tbl_OrderDetails> OrderDetails { get; set; }

        public ICollection<tbl_OrderStateHistory> OrderStateHistories { get; set; }

		public decimal TotalPrice()
        {
            return OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice()) + DeliveryPrice.GetCost(OrderDetails.Sum(x => x.Count * x.ProductPriceHistory.GetPrice()));

        }

    }
}
