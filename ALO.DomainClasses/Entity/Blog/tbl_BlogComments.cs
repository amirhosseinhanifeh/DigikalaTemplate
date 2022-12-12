using System;

namespace ALO.DomainClasses.Entity.Blog
{
    public class tbl_BlogComments:BaseEntity
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Body { get; set; }
        public string Response { get; set; }
        public string IP { get; set; }


        public long BlogId { get; set; }
        public tbl_Blog Blog{ get; set; }
    }
}
