using ALO.DomainClasses.Entity.Account;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductVisits : BaseEntity
    {
        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }
        public long UserId { get; set; }
        public tbl_Users User { get; set; }
        public int Count { get; set; }
    }
}
