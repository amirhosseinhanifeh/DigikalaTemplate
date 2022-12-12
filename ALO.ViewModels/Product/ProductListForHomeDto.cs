using ALO.Common.Utilities.Methods;
using ALO.DomainClasses.Entity.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Product
{
    public class ProductListForHomeDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Abstract { get; set; }
        public bool IsSpecial { get; set; }
        public string Cost { get; set; }
        public string Discount { get; set; }
        public string Image { get; set; }
        public string Date { get; set; }
        public string Url { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public List<ProductCustomFields> Values { get; set; }
        public bool Call { get; set; }
    }

}
