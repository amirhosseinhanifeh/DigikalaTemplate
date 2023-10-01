using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ALO.DomainClasses.Entity.Order
{
    public class tbl_OrderStateHistory:BaseEntity
    {
        public OrderState OrderState { get; set; }
        public long OrderId { get; set; }
        public tbl_Order Order { get; set; }

    }
}
