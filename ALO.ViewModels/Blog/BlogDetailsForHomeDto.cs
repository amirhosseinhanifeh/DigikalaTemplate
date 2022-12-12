using System;
using System.Collections.Generic;

namespace ALO.ViewModels.Blog
{
    public class BlogDetailsForHomeDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Abstract { get; set; }
        public string Image { get; set; }

        public string Category { get; set; }
        #region Seo
        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        public List<BlogCommentForWebsiteDto> Comments { get; set; }
        #endregion
    }

}
