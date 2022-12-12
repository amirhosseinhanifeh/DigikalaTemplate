using System;

namespace ALO.ViewModels.BlogCategory
{
    public class GetBlogCategoryListForAdminDTO:BaseSeo
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public int Row { get; set; }
    }
}
