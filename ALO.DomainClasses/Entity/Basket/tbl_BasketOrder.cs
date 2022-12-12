using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Basket
{
    public class tbl_BasketOrder:BaseEntity
    { 

        public long UserId { get; set; }
        public tbl_Users User{ get; set; }

        public ICollection<tbl_BasketOrderProducts> BasketOrderProducts { get; set; }


    }
}
