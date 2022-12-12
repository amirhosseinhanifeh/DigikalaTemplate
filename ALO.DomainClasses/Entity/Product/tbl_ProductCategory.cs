using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductCategory : BaseEntity
    {
        public string Title { get; set; }
        public long MainProuctCategoryId { get; set; }
        public tbl_MainProductCategory MainProuctCategory { get; set; }
        public ICollection<tbl_SubProductCategory> SubProductCategories { get; set; }
        public ICollection<tbl_ProductCustomFields> ProductCustomFields { get; set; }

        #region Seo
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion
    }
}
