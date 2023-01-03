using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels
{
    public class BaseSeo
    {
        #region Seo
        [Display(Name = "آدرس صفحه")]
        public string Url { get; set; }
        [Display(Name = "عنوان بالای صفحه")]
        public string PageTitle { get; set; }
        [Display(Name = "کلمات کلیدی")]
        public string[] MetaKeyword { get; set; }
        [Display(Name = "توضیحات سئو")]
        public string MetaDescription { get; set; }

        #endregion
    }
}
