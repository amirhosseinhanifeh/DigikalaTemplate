using ALO.Common.Utilities.ConvertTo;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.City;
using ALO.DomainClasses.Entity.IMG;
using ALO.DomainClasses.Entity.Order;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Product
{

    public class tbl_Product : BaseEntity
    {
        public string Title { get; set; }
        public string EnTitle { get; set; }
        public string Description { get; set; }
        public string Abstract { get; set; }
        public bool IsSpecial { get; set; }

        public ProductState State { get; set; }
        public long? ImageId { get; set; }
        public tbl_Image Image { get; set; }

        public long? FileId { get; set; }
        public tbl_File File { get; set; }

        public long? SubProductCategoryId { get; set; }
        public tbl_SubProductCategory SubProductCategory { get; set; }

        public long? ProductCategoryId { get; set; }
        public tbl_ProductCategory ProductCategory { get; set; }


        public long? MainProductCategoryId { get; set; }
        public tbl_MainProductCategory MainProductCategory { get; set; }

        public long? BrandId { get; set; }
        public tbl_Brands Brand { get; set; }

        public long? CityId { get; set; }
        public tbl_City City { get; set; }
        public long? OwnerId { get; set; }
        [ForeignKey(nameof(OwnerId))]
        public tbl_Users Owner { get; set; }
        public ICollection<tbl_ProductComment> ProductComments { get; set; }
        public ICollection<tbl_Image> Images { get; set; }
        public ICollection<tbl_ProductRating> Ratings { get; set; }

        public ICollection<tbl_ProductCustomFieldValues> ProductCustomFieldValues { get; set; }
        public ICollection<tbl_Users> Users { get; set; }
        public ICollection<tbl_ProductTags> ProductTags { get; set; }
        public ICollection<tbl_ProductVisits> ProductVisits { get; set; }
        public ICollection<tbl_ProductPriceHistory> ProductPriceHistories { get; set; }

        #region Seo
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion

        public object GetCategoryData()
        {
            if (MainProductCategory != null)
            {
                return new { MainProductCategoryId = MainProductCategoryId, Name = MainProductCategory.Name };
            }
            if (ProductCategory != null)
            {
                return new { ProductCategoryId = ProductCategoryId, Name = ProductCategory.Title };
            }
            if (SubProductCategory != null)
            {
                return new { SubProductCategoryId = SubProductCategoryId, Name = SubProductCategory.Title };
            }
            return null;
        }
        public decimal GetLastPrice()
        {
            if (ProductPriceHistories != null)
            {
                if (ProductPriceHistories.Any())
                {
                    var last = ProductPriceHistories.LastOrDefault();
                    return last.Price;
                }
            }
            return 0;
        }
        public decimal? GetDiscountPrice()
        {
            if (ProductPriceHistories != null)
            {
                if (ProductPriceHistories.Any())
                {
                    var last = ProductPriceHistories.LastOrDefault();
                    return last.DiscountPrice;
                }
            }
            return null;
        }
        public int? CalculatePercent()
        {
            if (GetDiscountPrice() != null)
            {
                var d = GetDiscountPrice().Value - GetLastPrice();
                
                d= d/ GetLastPrice() * (-100);
                return (int)Math.Round(d );
            }
            return null;
        }
    }
    public enum ProductState
    {
        ACTIVED,
        PENDING,
        DELETED,

    }
    public class tbl_ProductPriceHistory : BaseEntity
    {
        public long ColorId { get; set; }
        public tbl_Color Color { get; set; }
        public decimal Price { get; set; }
        public int Inventory { get; set; }
        public decimal? DiscountPrice { get; set; }
        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }
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
    public class tbl_ProductVisits : BaseEntity
    {
        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }
        public long UserId { get; set; }
        public tbl_Users User { get; set; }
    }
    public class tbl_ProductTags : BaseEntity
    {
        public string Name { get; set; }
        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }

    }
}
