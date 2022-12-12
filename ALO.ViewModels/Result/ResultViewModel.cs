using ALO.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.ViewModels.Result
{
   public class ResultViewModel
    {
        public Status Status { get; set; }
        public string Message { get; set; }
        public NotificationType NotificationType { get; set; }
    }
}
