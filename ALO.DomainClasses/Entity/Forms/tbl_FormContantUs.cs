using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Forms
{
    public class tbl_FormContantUs : BaseEntity
    {
        [Display(Name = "ایمیل")]
        [Required(ErrorMessage = "اجباری")]
        public string Email { get; set; }
        [Display(Name = "موبایل")]
        public string Mobile { get; set; }
        [Display(Name = "نام و نام خانوادگی")]
        [Required(ErrorMessage = "اجباری")]
        public string FullName { get; set; }
        [Display(Name = "متن پیام")]
        [Required(ErrorMessage = "اجباری")]
        public string Body { get; set; }

        public long? LanguageId { get; set; }
        public tbl_Language Language { get; set; }

    }
}
