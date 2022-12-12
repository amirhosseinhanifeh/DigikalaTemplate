using ALO.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.ViewModels.Order.Reserve
{
    public class ReserveListViewModel
    {
        public long Id { get; set; }
        public string Customer { get; set; }
        public long UserId { get; set; }
        public string Mobile { get; set; }

        public string BerberName { get; set; }
        public long BerberId { get; set; }

        public string PersianDate { get; set; }

        public TimeSpan Time { get; set; }

        public int status { get; set; }

        public bool IsSeen { get; set; }
        public decimal Cost { get; set; }
    }
}
