using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductGuarantee:BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<tbl_ProductPriceHistory> ProductPriceHistories { get; set; }
    }
}
