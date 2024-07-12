using ALO.DomainClasses.Entity.IMG;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_MainProductCategory : BaseEntity
    {
        public long? LogoId { get; set; }
        public tbl_Image Logo { get; set; }
        [Display(Name="دسته اصلی")]
        public string Name { get; set; }
        public ICollection<tbl_ProductCategory> ProductCategories { get; set; }
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

    }
}
