using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Order
{
    public class tbl_DeliveryPrice : BaseEntity
    {
        public string Name { get; set; }
        public decimal Cost { get; set; }
        public decimal? FromPrice { get; set; }
        public ICollection<tbl_Order> Orders { get; set; }

        public bool IsFree()
        {
            if (Cost == 0)
                return true;
            return false;
        }
        public bool IsFreeFrom(decimal price)
        {
            if (FromPrice == null)
                return false;
            if (price > FromPrice)
                return true;
            return false;
        }
        public decimal GetCost(decimal price)
        {
            if (FromPrice == null || FromPrice == 0)
                return Cost;
            if (price > FromPrice)
                return 0;
            return Cost;
        }
    }
}
