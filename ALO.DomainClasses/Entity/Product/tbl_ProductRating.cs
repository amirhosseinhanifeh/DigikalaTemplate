using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Product
{
   public class tbl_ProductRating:BaseEntity
    {
        public long ProductId { get; set; }
        public long UserId { get; set; }
        public decimal Rating { get; set; }

        public tbl_Product Product{ get; set; }
        public tbl_Users User { get; set; }
    }
}
