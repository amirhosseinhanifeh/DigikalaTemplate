using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.BankSetting
{
    public class tbl_Banks : BaseEntity
    {
        /// <summary>
        /// نوع بانک
        /// </summary>
        /// 
        [Display(Name = "نوع بانک")]
        public BankType BankType { get; set; }

        [Display(Name = "کد مرچنت")]
        public string MerchantId { get; set; }

        [Display(Name = "آدرس درگاه اصلی")]
        public string PaymentUrl { get; set; }

        [Display(Name = "آدرس درگاه تست")]
        public string SandBoxUrl { get; set; }

        [Display(Name = "محیط تست؟")]
        public bool IsSandbox { get; set; }
    }
    public enum BankType
    {
        [Display(Name = "زرین پال")]
        ZARINPAL,

        [Display(Name = "ملت")]
        MELLAT,

        [Display(Name = "سامان")]
        SAMAN
    }
}
