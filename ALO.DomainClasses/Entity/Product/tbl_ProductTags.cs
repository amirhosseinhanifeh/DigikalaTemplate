namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductTags : BaseEntity
    {
        public string Name { get; set; }
        public long ProductId { get; set; }
        public tbl_Product Product { get; set; }

    }
}
