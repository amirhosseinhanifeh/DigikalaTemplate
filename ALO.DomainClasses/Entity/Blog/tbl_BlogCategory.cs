using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Blog
{
    public class tbl_BlogCategory:BaseEntity
    {
        public string Title { get; set; }
        public long BlogTypeId{ get; set; }
        public tbl_BlogType BlogType { get; set; }
        public long? LanguageId { get; set; }
        public tbl_Language Language { get; set; }
        public ICollection<tbl_Blog>Blogs { get; set; }

        #region Seo
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion
    }
}
