using ALO.DomainClasses.Entity.IMG;
using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_MainProductCategory : BaseEntity
    {
        public long? LogoId { get; set; }
        public tbl_Image Logo { get; set; }
        public string Name { get; set; }
        public ICollection<tbl_ProductCategory> ProductCategories { get; set; }
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

    }
}
