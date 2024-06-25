using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ALO.DomainClasses.Entity.Account
{
    public class tbl_Role : BaseEntity
    {
        [Display(Name = "نام")]
        public string RoleName { get; set; }
        [Display(Name = "ترتیب")]
        public string RoleIndex { get; set; }

        #region Navigation

        public ICollection<tbl_Users> Users { get; set; }

        #endregion

    }
}
