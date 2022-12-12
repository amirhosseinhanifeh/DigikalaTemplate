using System.Collections.Generic;

namespace ALO.ViewModels.Product
{
    public class CategoryListForHomeDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }

        public List<ProductListForHomeDto> Products { get; set; }
    }
}
