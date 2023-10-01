using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductPriceOptionValue : BaseEntity
    {
        public string Value { get; set; }
        public long? ProductId { get; set; }
        public tbl_Product Product { get; set; }
        public long ProductPriceOptionId { get; set; }
        public tbl_ProductPriceOption ProductPriceOption { get; set; }
        public ICollection<tbl_ProductPriceHistory> ProductPriceHistories { get; set; }

    }
}
