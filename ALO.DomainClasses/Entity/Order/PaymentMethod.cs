using System.ComponentModel.DataAnnotations;

namespace ALO.DomainClasses.Entity.Order
{
    public enum PaymentMethod
    {
        [Display(Name = "درگاه پرداخت")]
        INTERNET,

        [Display(Name = "پرداخت درب منزل")]
        PayInDelivery,

        [Display(Name = "کیف پول")]
        WALLET
    }
}
