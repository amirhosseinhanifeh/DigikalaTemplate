using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductComment:BaseEntity
    {

        public long UserId { get; set; }
        public tbl_Users User { get; set; }
        public string Body { get; set; }
        public string Response { get; set; }
        public string IP { get; set; }


        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }

        public long? ProductCommentId { get; set; }
        public tbl_ProductComment ProductComment { get; set; }

        public ICollection<tbl_ProductComment> ProductComments { get; set; }


    }
}
