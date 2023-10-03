using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Blog.Admin
{
    public class RequestBlogDTO : BaseSeo
    {
        public long? Id { get; set; }
        [Display(Name ="عنوان")]
        public string Title { get; set; }
        [Display(Name = "توضیحات")]
        public string Description { get; set; }
        [Display(Name = "خلاصه")]
        public string Abstract { get; set; }
        public int Visit { get; set; } = 0;
        [Display(Name = "نمایش در صفحه اول")]
        public bool ShowInHome { get; set; }
        [Display(Name = "عکس")]
        public long? ImageId { get; set; }
        [Display(Name = "دسته")]
        public long BlogCategoryId { get; set; }
    }
}
