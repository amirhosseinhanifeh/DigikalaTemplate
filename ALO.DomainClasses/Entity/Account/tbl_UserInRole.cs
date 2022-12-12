using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Entity.Account
{
    public class tbl_UserInRole
    {
        public long UserId { get; set; }
        public long RoleId { get; set; }


        #region Navigation

        public tbl_Users User { get; set; }
        public tbl_Role Role { get; set; }
        #endregion
    }
}
