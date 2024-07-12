using ALO.DomainClasses.Entity.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Discount
{
    public class tbl_Discount:BaseEntity
    {
        public string Code { get; set; }

        public double Percent { get; set; }

        public int UseCount { get; set; }

        public ICollection<tbl_Order> Orders { get; set; }
    }
}
