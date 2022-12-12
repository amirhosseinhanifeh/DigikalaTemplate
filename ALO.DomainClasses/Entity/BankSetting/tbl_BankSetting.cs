using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.BankSetting
{
    public class tbl_BankSetting:BaseEntity
    {
        /// <summary>
        /// نوع بانک
        /// </summary>
        public BankType BankType{ get; set; }
        public string MerchantId { get; set; }
        public string CallBackUrl { get; set; }
    }
    public enum BankType
    {
        ZARINPAL
    }
}
