using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductComment:BaseEntity
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Body { get; set; }
        public string Response { get; set; }
        public string IP { get; set; }


        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }


    }
}
