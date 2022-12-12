using ALO.DomainClasses.Entity.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.SpecialSell
{
    public class tbl_SpecialSell : BaseEntity
    {
        public string Title { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        /// <summary>
        /// درصد تخفیف
        /// </summary>
        public int Percent { get; set; }

        public ICollection<tbl_SpecialSellProducts> SpecialSellProducts { get; set; }



    }
}
