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
    public class tbl_SlideShow:BaseEntity
    {
        [Display(Name ="عنوان")]
        public string Title { get; set; }
        [Display(Name ="ویدیو آپاراتی")]
        public string Aparat { get; set; }

        [Display(Name = "عکس بک گراند")]
        public long? ImageId { get; set; }
        public tbl_Image Image{ get; set; }
        [Display(Name = "لینک")]
        public string Link { get; set; }
        [Display(Name = "متن لینک")]
        public string LinkText { get; set; }
        [Display(Name = "ترتیب نمایش")]
        public int Order { get; set; }

        public long? LanguageId { get; set; }
        public tbl_Language Language { get; set; }

    }
}
