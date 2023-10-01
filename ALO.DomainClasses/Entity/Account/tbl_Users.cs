using ALO.Common.Enums;
using ALO.DomainClasses.Entity.Financial;
using ALO.DomainClasses.Entity.Menu;
using ALO.DomainClasses.Entity.Order;
using ALO.DomainClasses.Entity.Permission;
using ALO.DomainClasses.Entity.PFL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ALO.DomainClasses.Entity.Account
{
    public class tbl_Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Display(Name ="ایمیل")]
        public string Email { get; set; }
        [Display(Name = "موبایل")]
        public string Mobile { get; set; }
        [Display(Name = "رمز  عبور")]
        public string Password { get; set; }

        public DateTime RegisteredDate { get; set; } = DateTime.Now;

        /// <summary>
        /// f.rename
        /// </summary>
        public Device Registeredby { get; set; }

        /// <summary>
        /// f.new
        /// </summary>
        public string IP { get; set; }


        /// <summary>
        /// f.new
        /// </summary>
        public bool IsActive { get; set; } = true;

        public DateTime LastLogin { get; set; }
        public string BrowserName { get; set; }
        public bool IsDelete { get; set; } = false;


        #region Navigation

        public tbl_Profile Profile { get; set; }

        public ICollection<tbl_Role> Roles { get; set; }

        public ICollection<tbl_FinancialAccount> FinancialAccounts { get; set; }
        public ICollection<Product.tbl_Product> Products { get; set; }
        public ICollection<tbl_UserAddresses> Addresses { get; set; }
        public ICollection<tbl_Order> Orders { get; set; }
        public ICollection<tbl_Menu> Menus { get; set; }
        public ICollection<tbl_Permission> Permissions { get; set; }
        #endregion
    }
}