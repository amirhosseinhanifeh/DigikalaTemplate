using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Entity.Financial
{
    public class tbl_FinancialAccount:BaseEntity
    {
        public long UserId { get; set; }
        public decimal Debtor { get; set; }
        public decimal Creditor { get; set; }
        public decimal AccountBalance { get; set; }
        public string Description { get; set; }

        #region Navigation

        public tbl_Users Users { get; set; }
        
        #endregion
    }
}
