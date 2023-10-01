using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Wallet
{
    public class tbl_Wallet:BaseEntity
	{
        public decimal Cost { get; set; }
        public long UserId { get; set; }
        public tbl_Users User { get; set; }
        public ICollection<tbl_WalletHistory> WalletHistories { get; set; }
    }
}
