using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_SubProductCategory:BaseEntity
    {
        public string Title { get; set; }
        public bool ShowInHome { get; set; } = false;
        public long ProductCategoryId { get; set; }


        public tbl_ProductCategory ProductCategory { get; set; }

        public ICollection<tbl_Product> Products { get; set; }


        #region Seo
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion
    }
    public enum FieldType
    {
        TEXT,
        CHECKBOX,
        DROPDOWN,
        RANGE,
        NUMBER
    }
}
