using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.SpecialSell
{
    public class GetSpecialSellForHomeDto
    {
        public string SpecialTitle { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }

        public string Price { get; set; }
        public string OffPrice { get; set; }
        public string EndDatePersian { get; set; }
        public DateTime EndDate { get; set; }

    }
}
