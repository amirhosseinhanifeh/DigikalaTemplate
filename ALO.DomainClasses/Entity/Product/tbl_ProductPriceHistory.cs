using ALO.Common.Utilities.ConvertTo;
using ALO.DomainClasses.Entity.Order;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductPriceHistory : BaseEntity
    {
        [Display(Name = "رنگ")]
        public long? ColorId { get; set; }
        public tbl_Color Color { get; set; }
        [Display(Name = "قیمت")]
        public decimal Price { get; set; }
        [Display(Name = "موجودی")]
        public int Inventory { get; set; }
        [Display(Name = "حداقل سفارش")]
        public int? MinCanOrder { get; set; }
        [Display(Name = "قیمت با تخفیف")]
        public decimal? DiscountPrice { get; set; }
        [Display(Name = "گارانتی")]
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
}
