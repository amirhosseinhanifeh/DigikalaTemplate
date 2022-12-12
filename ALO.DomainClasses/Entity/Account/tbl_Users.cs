using ALO.Common.Enums;
using ALO.DomainClasses.Entity.Financial;
using ALO.DomainClasses.Entity.Order;
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

        public string Mobile { get; set; }

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

       

        public bool IsDelete { get; set; } = false;
        
        public ICollection<Product.tbl_Product> Products { get; set; }
        public ICollection<Product.tbl_Product> UserProducts { get; set; }
        public ICollection<tbl_UserAddresses> Addresses { get; set; }
        public ICollection<tbl_Order> Orders { get; set; }

        #region Navigation

        public tbl_Profile Profile { get; set; }

        public ICollection<tbl_UserInRole> tbl_UserInRole { get; set; }

        public ICollection<tbl_FinancialAccount> FinancialAccounts { get; set; }

        #endregion
    }
    public class tbl_UserAddresses:BaseEntity {


        public string Phone { get; set; }
        public string Mobile { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        public string Address { get; set; }
        public int Pelak { get; set; }
        public int Vahed { get; set; }
        public bool IsDefault { get; set; }
        public long UserId { get; set; }
        public tbl_Users User { get; set; }
    }
}