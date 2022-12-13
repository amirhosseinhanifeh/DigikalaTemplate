using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.LinkManagement
{
    public class tbl_GroupLinkManagement:BaseEntity
    {
        [Display(Name ="عنوان")]
        public string Title { get; set; }
        [Display(Name = "نام مسیر")]
        public string RouteName { get; set; }
        public long? LanguageId { get; set; }
        public tbl_Language Language{ get; set; }
        public ICollection<tbl_LinkManagement> LinkManagements { get; set; }
    }
}
