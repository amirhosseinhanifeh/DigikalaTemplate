using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.ProductComment
{
    public class RequestProductCommentDto
    {
        public long ProductId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Body { get; set; }
        public string IP { get; set; }
    }
}
