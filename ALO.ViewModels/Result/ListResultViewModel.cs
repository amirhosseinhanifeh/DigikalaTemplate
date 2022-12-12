using ALO.Common.Enums;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace ALO.ViewModels.Result
{
    public class ListResultViewModel<T>
    {
        public Status Status { get; set; }
        public string Message { get; set; }
        public NotificationType NotificationType { get; set; }
        public T model{ get; set; }
    }
    public class WEBListResultViewModel<T>
    {
        public Status Status { get; set; }
        public string Message { get; set; }
        public NotificationType NotificationType { get; set; }
        public T data { get; set; }
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;
    }
}
