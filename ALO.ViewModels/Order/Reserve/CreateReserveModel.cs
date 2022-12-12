using ALO.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ALO.ViewModels.Order.Reserve
{
    public class CreateReserveModel
    {
        public long Id { get; set; }
        [Required]
        public long BerberId { get; set; }

        public long UserId { get; set; }

        public string PersianDate { get; set; }

        public TimeSpan Time{ get; set; }

        public decimal Cost { get; set; }

        public long[] Services{ get; set; }
        public ReservationStatus status { get; set; }

    }
}
