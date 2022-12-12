using ALO.DomainClasses.Entity.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.SpecialSell
{
    public class tbl_SpecialSellProducts:BaseEntity
    {
        public long ProductId { get; set; }
        public tbl_Product Product{ get; set; }


        public long SpecialSellId { get; set; }
        public tbl_SpecialSell SpecialSell { get; set; }
    }
}
