using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.Order
{
    public class GetUserOrderListDTO
    {
        public string Title { get; set; }
        public string OrderCode { get; set; }
        public string ProductImage { get; set; }
        public string DownloadFile { get; set; }
        public int Count { get; set; }
        public string UnitPrice { get; set; }
    }
}
