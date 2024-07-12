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
        [Display(Name = "آماده برای ارسال")]
        READYTODELIVERY,
        [Display(Name = "تحویل داده شد")]
        DELIVERED,
    }
}
