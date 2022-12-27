using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Content
{
    public class tbl_Tools:BaseEntity
    {
        [Display(Name = "نام ابزار")]
        public string Name { get; set; }
        [Display(Name = "اسکریپت ابزار")]
        public string Tool { get; set; }
        /// <summary>
        ///meta
        ///script
        /// </summary>
        /// 
        [Display(Name ="نوع ابزار")]
        public string Type { get; set; }
    }
}
