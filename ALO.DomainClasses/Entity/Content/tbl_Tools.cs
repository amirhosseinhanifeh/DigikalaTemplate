using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Content
{
    public class tbl_Tools:BaseEntity
    {
        public string Name { get; set; }
        public string Tool { get; set; }
        /// <summary>
        ///meta
        ///script
        /// </summary>
        public string Type { get; set; }
    }
}
