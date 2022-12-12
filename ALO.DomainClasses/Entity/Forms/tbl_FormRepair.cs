using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Forms
{
    public class tbl_FormRepair:BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Body { get; set; }
        public long? UserId { get; set; }
        public tbl_Users User { get; set; }
    }
}
