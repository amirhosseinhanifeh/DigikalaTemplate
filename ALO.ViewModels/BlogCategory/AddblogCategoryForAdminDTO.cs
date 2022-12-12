using System;
using System.ComponentModel.DataAnnotations;

namespace ALO.ViewModels.BlogCategory
{
    public class AddblogCategoryForAdminDTO : BaseSeo
    {
        public long? Id { get; set; }
        [Display(Name ="عنوان")]
        public string Title { get; set; }
        [Display(Name ="مرتبط با")]
        public long BlogTypeId { get; set; }

    }
}
