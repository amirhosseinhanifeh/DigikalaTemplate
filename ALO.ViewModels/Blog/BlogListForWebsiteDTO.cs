using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Blog
{
    public class BlogListForWebsiteDTO:BaseSeo
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Abstract { get; set; }
        public string Image { get; set; }

        public string Category { get; set; }
        public string Date { get; set; }
    }

    public class BlogListForAdminDTO
    {
        public long Id { get; set; }
        public int Row{ get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
    }

}
