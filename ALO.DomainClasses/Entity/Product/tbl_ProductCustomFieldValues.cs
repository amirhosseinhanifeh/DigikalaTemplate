namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductCustomFieldValues : BaseEntity
    {
        public string PersianValue { get; set; }
        public string Value { get; set; }
        public long? ProductCustomFieldsOptionValueId { get; set; }
        public tbl_ProductCustomFieldsOptionValues ProductCustomFieldsOptionValue { get; set; }
        public long? ProductId { get; set; }
        public tbl_Product Product { get; set; }
        public long ProductCustomFieldId { get; set; }
        public tbl_ProductCustomFields ProductCustomField  { get; set; }

    }
}
