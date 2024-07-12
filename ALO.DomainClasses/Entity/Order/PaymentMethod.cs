using System.ComponentModel.DataAnnotations;

namespace ALO.DomainClasses.Entity.Order
{
    public enum PaymentMethod
    {
        [Display(Name = "اینترنتی")]
        INTERNET,
        [Display(Name = "کیف پول")]
        WALLET
    }
}
