using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.Entity.Menu
{
    public class tbl_Menu : BaseEntity
    {
        [Display(Name = "عنوان")]
        public string Name { get; set; }
        [Display(Name = "آیکون")]
        public string Icon { get; set; }
        [Display(Name = "لینک")]
        public string Link { get; set; }
        [Display(Name = "ترتیب")]
        public int Order { get; set; }

        public long? ParentId { get; set; }

        [ForeignKey(nameof(ParentId))]
        public tbl_Menu Menu { get; set; }

        public ICollection<tbl_Menu> ChildMenus { get; set; }

        public ICollection<tbl_Users> Users { get; set; }
    }
}
