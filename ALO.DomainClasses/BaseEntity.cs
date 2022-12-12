
using ALO.Common.Utilities.ConvertTo;
using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading;

namespace ALO.DomainClasses
{
    public class BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }


        public long? Createdby { get; set; }
        public long? Modifiedby { get; set; }

        public DateTime? ModifiedDate { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public bool IsDelete { get; set; } = false;

        public bool IsActive { get; set; } = true;


        #region Navigation
        //[ForeignKey("Createdby")]
        //public tbl_Users Creator { get; set; }

        [NotMapped]
        [ForeignKey("Modifiedby")]
        public tbl_Users Modifitor { get; set; }
        #endregion
    }
}
