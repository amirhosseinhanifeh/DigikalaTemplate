using ALO.DomainClasses.Entity.IMG;
using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Content
{
    public class tbl_Blocks:BaseEntity
    {
        [Display(Name ="عنوان")]
        public string Name { get; set; }
        [Display(Name = "نام مسیر")]
        public string RouteName { get; set; }
        [Display(Name = "عنوان")]
        public string Title { get; set; }
        [Display(Name = "عنوان")]

        public string Description { get; set; }
        [Display(Name = "عکس")]

        public long? ImageId { get; set; }
        public tbl_Image Image { get; set; }

        public long? LanguageId { get; set; }
        public tbl_Language Language{ get; set; }
    }
}
