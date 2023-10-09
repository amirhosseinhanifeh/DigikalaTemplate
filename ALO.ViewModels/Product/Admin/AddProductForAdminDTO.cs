using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Product.Admin
{
    public class AddProductForAdminDTO:BaseSeo
    {
        public long Id { get; set; }
        [Display(Name="نام محصول")]
        public string Title { get; set; }
        [Display(Name = "نام  انگلیسی محصول")]
        public string EnTitle { get; set; }
        [Display(Name = "لینک ترب")]
        public string TorobLink { get; set; }
        [Display(Name = "توضیحات")]
        public string Description { get; set; }
        [Display(Name = "خلاصه")]
        public string Abstract { get; set; }
        [Display(Name = "تگ محصول")]
        public bool IsSpecial { get; set; }
        [Display(Name = "توسط گوگل ایندکس شود؟")]
        public bool DoIndex { get; set; }
        [Display(Name = "عکس محصول")]
        public long? ImageId { get; set; }
        [Display(Name = "فایل دانلود محصول")]
        public long? FileId { get; set; }
        [Display(Name = "قیمت")]
        public decimal Cost { get; set; }
        [Display(Name = "تخفیف")]
        public decimal? Discount { get; set; }
        [Display(Name = "موجودی")]
        public int Inventory { get; set; }
        [Display(Name = "دسته محصول")]
        public long? ProductCategoryId { get; set; }
        [Display(Name = "زیر دسته محصول")]
        public long? SubProductCategoryId { get; set; }
        [Display(Name = "دسته اصلی محصول")]
        public long? MainProuctCategoryId { get; set; }
        [Display(Name = "برند محصول")]
        public long? BrandId { get; set; }
        public long[] ImageIds { get; set; }
        public List<RequestCreateProductOptionValuesDTO> Values { get; set; }

    }
    public class RequestCreateProductDTO
    {
        public byte[] Image { get; set; }
        [JsonIgnore]
        public IFormFile File { get; set; }
        public long CityId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public long SubCategoryId { get; set; }
        public List<RequestCreateProductOptionValuesDTO> Values { get; set; }
    }
    public class RequestCreateProductOptionValuesDTO
    {
        public int FieldId { get; set; }
        public int? OptionId { get; set; }
        public string Value { get; set; }
    }
}
