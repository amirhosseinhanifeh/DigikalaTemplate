using System.Collections.Generic;

namespace ALO.ViewModels.Product
{

    public class CategoryForSiteHeader
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public List<SubCategoryForSiteHeader> SubCategoryForSiteHeaders { get; set; }
    }
    public class SubCategoryForSiteHeader
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
    }
}
