using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Entity.Account
{
    public class tbl_Role:BaseEntity
    {
        public string RoleName { get; set; }
        public string RoleIndex { get; set; }

        #region Navigation

        public ICollection<tbl_Users> Users{ get; set; }

        #endregion

    }
}
