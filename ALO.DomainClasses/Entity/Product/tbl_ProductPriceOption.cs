using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductPriceOption : BaseEntity
    {
        public long? ProductCategoryId { get; set; }
        public tbl_ProductCategory ProductCategory { get; set; }
        public long? SubProductCategoryId { get; set; }
        public tbl_ProductCategory SubProductCategory { get; set; }
        public string Name { get; set; }
        public ICollection<tbl_ProductPriceOptionValue> OptionValues { get; set; }

    }
}
