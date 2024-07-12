using ALO.Common.Enums;
using System.ComponentModel.DataAnnotations;

namespace ALO.ViewModels.Account
{
    public class RegisterViewModel
    {

        [Required(ErrorMessage = "اجباری")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "اجباری")]

        public string LastName { get; set; }
        [Required(ErrorMessage = "اجباری")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "ایمیل معتبر نمی باشد")]
        public string Email { get; set; }
        [Required(ErrorMessage = "اجباری")]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "تکرار رمز عبور با رمز عبور مطابقت ندارد")]
        [Required(ErrorMessage = "اجباری")]
        public string ConfirmPassword { get; set; }
        public Device Registeredby { get; set; }

        public string IP { get; set; }
        [Required(ErrorMessage = "اجباری")]
        public string Mobile { get; set; }
    }
}
