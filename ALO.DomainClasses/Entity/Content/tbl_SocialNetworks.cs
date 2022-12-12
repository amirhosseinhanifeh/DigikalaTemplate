using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Content
{
    public class tbl_SocialNetworks : BaseEntity
    {
        [Display(Name = "لینک شبکه اجتماعی")]
        public string Url { get; set; } 
         [Display(Name = "آیکون")]
        public string Icon { get; set; }
        [Display(Name = "نوع شبکه اجتماعی")]
        public EnumSocials Social { get; set; }

    }
    public enum EnumSocials
    {
        [Display(Name = "تلگرام")]
        TELEGRAM,
        [Display(Name = "فیس بوک")]
        FACEBOOK,
        [Display(Name = "اینستاگرام")]
        INSTAGRAM,
        [Display(Name = "لینکدین")]
        LINKDIN,

    }
}
