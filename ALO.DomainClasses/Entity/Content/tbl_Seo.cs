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
    public class tbl_Seo:BaseEntity
    {

        #region Seo
        [Display(Name ="عنوان بالای صفحه")]
        public string PageTitle { get; set; }
        [Display(Name = "کلمات کلیدی")]
        public string MetaKeyword { get; set; }
        [Display(Name = "توضیحات سئو")]
        public string MetaDescription { get; set; }
        [Display(Name = "عرض جغرافیایی")]
        public string Lat { get; set; }
        [Display(Name = "طول جغرافیایی")]
        public string Lng { get; set; }
        [Display(Name = "آدرس")]
        public string Address { get; set; }
        [Display(Name = "کد پستی")]
        public string PostalCode { get; set; }
        [Display(Name = "تلفن")]
        public string Phone { get; set; }
        [Display(Name = "فاو آیکون")]
        public Guid? FavIconId { get; set; }
        public tbl_Image FavIcon{ get; set; }
        [Display(Name = "عکس سئو")]
        public Guid? OgImageId { get; set; }
        public tbl_Image OgImage { get; set; }
        #endregion

        public long? LanguageId { get; set; }
        public tbl_Language Language { get; set; }
    }
}
