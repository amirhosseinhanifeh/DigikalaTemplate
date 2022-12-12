using ALO.Common.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ALO.ViewModels.Account
{
    public class RegisterViewModel
    {

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "تکرار رمز عبور با رمز عبور مطابقت ندارد")]
        public string ConfirmPassword { get; set; }

        public Device Registeredby { get; set; }

        public string IP { get; set; }
        public string Mobile { get; set; }
    }
}
