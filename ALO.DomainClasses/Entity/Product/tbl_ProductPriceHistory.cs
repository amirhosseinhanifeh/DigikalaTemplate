using ALO.Common.Utilities.ConvertTo;
using ALO.DomainClasses.Entity.Order;
using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductPriceHistory : BaseEntity
    {
        public long? ColorId { get; set; }
        public tbl_Color Color { get; set; }
        public decimal Price { get; set; }
        public int Inventory { get; set; }
        public decimal? DiscountPrice { get; set; }
        public long? ProductGuaranteeId { get; set; }
        public tbl_ProductGuarantee ProductGuarantee { get; set; }
        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }
        public ICollection<tbl_ProductPriceOptionValue> ProductPriceOptionValues { get; set; }
        public ICollection<tbl_OrderDetails> OrderDetails { get; set; }
        public decimal GetPrice()
        {
            if (DiscountPrice != null)
            {
                return DiscountPrice.Value;
            }
            return Price;
        }
        public bool HasDiscount()
        {
            return DiscountPrice != null;
        }
        public string GetPriceValue()
        {
            if (DiscountPrice != null)
            {
                return DiscountPrice.Value.ToString("n0").toPersianNumber();
            }
            return (Price).ToString("n0").toPersianNumber();
        }
    }
    public class tbl_ProductPriceOption : BaseEntity
    {
        public long? ProductCategoryId { get; set; }
        public tbl_ProductCategory ProductCategory { get; set; }
        public long? SubProductCategoryId { get; set; }
        public tbl_ProductCategory SubProductCategory { get; set; }
        public string Name { get; set; }
        public ICollection<tbl_ProductPriceOptionValue> OptionValues { get; set; }

    }
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
