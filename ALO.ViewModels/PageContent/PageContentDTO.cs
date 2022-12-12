using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.PageContent
{
    public class PageContentDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }

        #region Seo

        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion
    }
}
