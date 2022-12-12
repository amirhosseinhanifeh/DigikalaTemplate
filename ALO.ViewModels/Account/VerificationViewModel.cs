using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ALO.ViewModels.Account
{
    public class VerificationViewModel
    {
        [Required]
        public string Mobile { get; set; }
        public string Code { get; set; }
    }
}
