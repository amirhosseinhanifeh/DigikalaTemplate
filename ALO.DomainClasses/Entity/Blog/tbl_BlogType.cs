using ALO.DomainClasses.Entity.Language;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Blog
{
    public class tbl_BlogType:BaseEntity
    {
        public string RouteName { get; set; }
        public string Name { get; set; }

        public long LanguageId { get; set; }
        public tbl_Language Language{ get; set; }
    }
}
