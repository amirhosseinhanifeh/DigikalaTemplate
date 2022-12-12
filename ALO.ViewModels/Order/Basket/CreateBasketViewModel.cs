using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.ViewModels.Order.Basket
{
    public class CreateBasketViewModel
    {
        public long CourtId { get; set; }

        public long UserId { get; set; }

        public string PersianDate { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }

    }
}
