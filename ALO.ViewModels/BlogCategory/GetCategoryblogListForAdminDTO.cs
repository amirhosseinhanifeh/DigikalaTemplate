using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Blog
{
    public class GetCategoryblogListForAdminDTO
    {
        public Guid Id { get; set; }
        public int Row { get; set; }
        public string Title { get; set; }
    }
    public class AddCategoryBlogForAdminDTO : BaseSeo
    {
        public Guid Id { get; set; }
        [Display(Name ="عنوان")]
        public string Title { get; set; }
    }
}
