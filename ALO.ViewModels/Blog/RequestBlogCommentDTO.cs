using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Blog
{
    public class RequestBlogCommentDTO
    {
        public long BlogId { get; set; }
        public string Body { get; set; }
        public string IP { get; set; }
    }
    public class BlogCommentForWebsiteDto
    {
        public string FullName { get; set; }
        public string Body { get; set; }
        public string Date { get; set; }
        public string Response { get; set; }
    }
}
