using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.ViewModels.Financial
{
    public class FinancialAccountViewModel
    {
        public DateTime CreatedDate { get; set; }
        public decimal Cost { get; set; }
        public decimal debtor { get; set; }
        public string Sdebtor { get; set; }
        public decimal creditor { get; set; }
        public string Screditor { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }


    }
}
