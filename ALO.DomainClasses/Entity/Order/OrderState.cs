using System.ComponentModel.DataAnnotations;

namespace ALO.DomainClasses.Entity.Order
{
    public enum OrderState
    {
        [Display(Name = "ساخته شده")]
        CREATED,
        [Display(Name = "در انتظار پرداخت")]
        PENDING,
        [Display(Name = "پرداخت شده")]
        PAYED,
        [Display(Name = "در حال بسته بندی")]
        PACKING,
        [Display(Name = "آماده برای ارسال")]
        READYTODELIVERY,
        [Display(Name = "ارسال شد")]
        DELIVERED,
    }
}
