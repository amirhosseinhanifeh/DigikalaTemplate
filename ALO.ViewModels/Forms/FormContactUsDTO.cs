using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Forms
{
    public class FormContactUsDTO
    {
        [Required(ErrorMessage ="اجباری می باشد")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "ایمیل معتبر نمی باشد")]
        public string Email { get; set; }
        [Required(ErrorMessage = "اجباری می باشد")]
        public string Mobile { get; set; }
        [Required(ErrorMessage = "اجباری می باشد")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "اجباری می باشد")]
        public string Body { get; set; }
    }
    public class FormRepairDTO
    {
        [Required(ErrorMessage = "اجباری می باشد")]
        public string Mobile { get; set; }
        [Required(ErrorMessage = "اجباری می باشد")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "اجباری می باشد")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "اجباری می باشد")]
        public string Body { get; set; }
    }
}
