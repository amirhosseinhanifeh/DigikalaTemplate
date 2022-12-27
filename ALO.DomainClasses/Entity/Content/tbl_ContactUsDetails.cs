using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Content
{
    public class tbl_ContactUsDetails:BaseEntity
    {
        [Display(Name ="شماره همراه")]
        public string Tel { get; set; }
        [Display(Name = "تلفن")]
        public string Phone { get; set; }
        [Display(Name = "موبایل")]
        public string Mobile { get; set; }
        [Display(Name = "آدرس")]
        public string Address { get; set; }
        [Display(Name = "آدرس در آلمان")]
        public string GermanyAddress { get; set; }
        [Display(Name = "مختصات آدرس در آلمان")]
        public string GemanyLocation { get; set; }
        [Display(Name = "عرض جغرافیایی")]

        public string Lat { get; set; }
        [Display(Name = "طول جغرافیایی")]
        public string Lng { get; set; }
        [Display(Name = "پست الکترونیکی")]

        public string Email { get; set; }
        public string GoogleMapFrame { get; set; }
        public long? LanguageId { get; set; }
        public tbl_Language Language { get; set; }
    }
}
