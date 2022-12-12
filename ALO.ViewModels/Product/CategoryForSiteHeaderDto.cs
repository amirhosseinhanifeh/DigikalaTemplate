using System.Collections.Generic;

namespace ALO.ViewModels.Product
{
    public class CategoryForSiteHeaderDto
    {
        public long Id { get; set; }
        public string Title{ get; set; }
        public string Url { get; set; }
        public List<CategoryForSiteHeader> Categories { get; set; }

    }
}
