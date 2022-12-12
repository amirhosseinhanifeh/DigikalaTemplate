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

        public ICollection<tbl_UserInRole> tbl_UserInRoles { get; set; }

        #endregion

    }
}
