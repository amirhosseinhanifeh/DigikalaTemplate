using ALO.ViewModels.ProductComment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Product
{
    public class ProductDetailsForHomeDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Abstract { get; set; }
        public bool IsSpecial { get; set; }
        public string CostDisplay { get; set; }
        public decimal Cost { get; set; }
        public int Inventory { get; set; }
        public string Image { get; set; }
        public bool IsFavorite { get; set; }
        public string SubCategory { get; set; }
        public ProductBrandDto Category { get; set; }
        public List<ProductBrandDto> Colors { get; set; }
        public List<ProductBrandDto> Tags { get; set; }
        public bool? IsBuy { get; set; }
        public string Date { get; set; }
        public ProductBrandDto Brand { get; set; }
        public List<ProductCustomFields> Values { get; set; }

        public bool DoIndex { get; set; }
        #region Seo
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }
        public List<ProductGalleryDTO> Images { get; set; }
        public List<ProductCommentForWebsiteDto> Comments { get; set; }
        public string State { get; set; }
        public string EnTitle { get; set; }
        #endregion
    }
    public class ProductBrandDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Hex { get; set; }
    }
    public class ProductCustomFields
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Key { get; set; }
        public List<ProductCustomFields> Options { get; set; }
    }
}
