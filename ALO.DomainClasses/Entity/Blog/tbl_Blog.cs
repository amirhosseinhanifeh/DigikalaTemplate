using ALO.DomainClasses.Entity.IMG;
using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Blog
{
    public class tbl_Blog:BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Abstract { get; set; }
        public int Visit { get; set; }
        public bool ShowInHome { get; set; } = false;
        public bool CanComment { get; set; } = true;

        public long? ImageId { get; set; }

        public tbl_Image Image{ get; set; }

        public long BlogCategoryId { get; set; }
        public tbl_BlogCategory BlogCategory { get; set; }

        public long? LanguageId { get; set; }
        public tbl_Language Language { get; set; }

        public ICollection<tbl_BlogComments> BlogComments { get; set; }

        #region Seo
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion
    }
}
