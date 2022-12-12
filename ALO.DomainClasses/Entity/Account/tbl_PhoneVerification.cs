using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ALO.DomainClasses.Entity.Account
{
    public class tbl_PhoneVerification
    {
        [Key]
        public string Mobile { get; set; }
        public string VerificationCode { get; set; }
    }
}
