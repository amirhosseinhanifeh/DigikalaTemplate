using System;
using System.ComponentModel.DataAnnotations;

namespace ALO.ViewModels.BlogCategory
{
    public class GetBlogCategoryListForAdminDTO : BaseSeo
    {
        public long Id { get; set; }
        [Display(Name = "عنوان")]
        public string Title { get; set; }
        [Display(Name = "وضعیت")]
        public string Status { get; set; }
        [Display(Name = "ردیف")]
        public int Row { get; set; }
    }
}
