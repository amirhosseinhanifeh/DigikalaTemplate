using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Permission
{
    public class tbl_Permission:BaseEntity
    {
        public string Name { get; set; }
        public ICollection<tbl_Users> Users { get; set; }
    }
}
