using System;
using System.ComponentModel.DataAnnotations;

namespace ALO.ViewModels.Product.Admin
{
    public class GetProductListForAdminDto
    {
        [Display(Name = "ردیف")]
        public int Row { get; set; }
        [Display(Name = "ردیف")]

        public long Id { get; set; }
        [Display(Name = "آدرس")]
        public string Url { get; set; }

        [Display(Name = "آخرین بروزرسانی")]
        public string LastModified { get; set; }

        [Display(Name = "نام محصول")]
        public string Title { get; set; }

        [Display(Name = "قیمت")]
        public string Cost { get; set; }

        [Display(Name = "عکس محصول")]
        public string Image { get; set; }

        [Display(Name = "وضعیت")]

        public string Status { get; set; }

        [Display(Name = "دسته")]

        public string SubCategory { get; set; }

        [Display(Name = "تعداد سفارش")]
        public int OrderCount { get; set; }

        public int CommentCount { get; set; }

        [Display(Name = "تعداد بازدید")]
        public int Visit { get; set; }

        [Display(Name = "تعداد بازدید کل")]
        public long AllVisit { get; set; }
        public int TagCount { get; set; }
    }
}
