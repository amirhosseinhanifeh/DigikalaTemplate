using ALO.DomainClasses.Entity.Account;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ALO.DomainClasses.Entity.Blog
{
    public class tbl_BlogComments:BaseEntity
    {
        [Display(Name = "متن")]
        public string Body { get; set; }
        [Display(Name = "پاسخ")]
        public string Response { get; set; }
        public string IP { get; set; }

        public long UserId { get; set; }
        public tbl_Users User { get; set; }
        public long BlogId { get; set; }
        public tbl_Blog Blog{ get; set; }
        public long? BlogCommentId { get; set; }
        public tbl_BlogComments BlogComment { get; set; }

        public ICollection<tbl_BlogComments> BlogComments { get; set; }
    }
}
