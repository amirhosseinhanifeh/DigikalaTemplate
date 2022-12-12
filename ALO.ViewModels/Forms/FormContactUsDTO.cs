using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Forms
{
    public class FormContactUsDTO
    {
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string FullName { get; set; }
        public string Body { get; set; }
    }
    public class FormRepairDTO
    {
        public string Mobile { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Body { get; set; }
    }
}
