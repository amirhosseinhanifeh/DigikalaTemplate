using ALO.DomainClasses.Entity.IMG;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Language
{
    public class tbl_Language:BaseEntity
    {
        [Display(Name="نام زبان")]
        [Required(ErrorMessage ="اجباری")]
        public string Name { get; set; }
        public long? FlagIconId { get; set; }
        public tbl_Image FlagIcon { get; set; }
        public string LanguageCode { get; set; }


    }
}
