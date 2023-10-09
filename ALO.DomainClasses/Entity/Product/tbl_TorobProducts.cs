namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_TorobProducts : BaseEntity
    {
        public string ShopName { get; set; }
        public string Price { get; set; }
        public string LastUpdate { get; set; }
        public string City { get; set; }
        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }
    }
}
