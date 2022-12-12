using ALO.DomainClasses.Entity.IMG;
using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_Brands:BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long? LogoId { get; set; }
        public tbl_Image Logo { get; set; }
        public long? ParentId { get; set; }
        public tbl_Brands Parent { get; set; }

        public long? MainProductCategoryId { get; set; }
        public tbl_MainProductCategory  MainProductCategory { get; set; }

        public ICollection<tbl_Product> Products { get; set; }
        public ICollection<tbl_Brands> Brands { get; set; }
    }
}
