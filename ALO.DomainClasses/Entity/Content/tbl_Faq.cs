using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Content
{
    public class tbl_Faq:BaseEntity
    {
        [Display(Name ="سوال")]
        public string Question { get; set; }
        [Display(Name = "پاسخ")]
        public string Answer { get; set; }
        [Display(Name = "ترتیب نمایش")]
        public int Row{ get; set; }

        public Guid? LanguageId { get; set; }
        public tbl_Language Language { get; set; }
    }
}
