using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_Color : BaseEntity
    {
        public string Name { get; set; }
        public string Hex { get; set; }
        public string EnName { get; set; }
        public ICollection<tbl_ProductPriceHistory> ProductPriceHistories { get; set; }
    }
}
