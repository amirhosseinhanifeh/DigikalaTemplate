using System.ComponentModel.DataAnnotations;

namespace ALO.DomainClasses.Entity.IMG
{
    public class tbl_VideoDetail
    {
        [Key]
        public long VideoId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public tbl_Image Video { get; set; }
    }
}
