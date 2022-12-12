using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Content
{
    public class tbl_PageContent:BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }

        #region Seo

        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion

        public long? LanguageId { get; set; }
        public tbl_Language Language { get; set; }
    }
}
