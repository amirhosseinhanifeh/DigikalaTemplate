namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductCustomFieldsOptionValues : BaseEntity
    {
        public string Value { get; set; }
        public long tbl_ProductCustomFieldId { get; set; }
        public tbl_ProductCustomFields tbl_ProductCustomField { get; set; }

    }
}
