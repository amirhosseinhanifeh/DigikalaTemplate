using ALO.DomainClasses.Entity.IMG;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.LinkManagement
{
    public class tbl_LinkManagement:BaseEntity
    {
        public string Title { get; set; }
        public string Abstract { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public string Link { get; set; }
        public long? ImageId { get; set; }
        public tbl_Image Image{ get; set; }

        public long GroupLinkManagementId { get; set; }
        public tbl_GroupLinkManagement GroupLinkManagement { get; set; }


        #region Seo

        public string Url { get; set; }
        public string PageTitle { get; set; }
        public string MetaKeyword { get; set; }
        public string MetaDescription { get; set; }

        #endregion
    }
}
