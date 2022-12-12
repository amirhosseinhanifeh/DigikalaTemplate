using System.Collections.Generic;

namespace ALO.DomainClasses.Entity.Product
{
    public class tbl_ProductCustomFields : BaseEntity
    {
        public string Name { get; set; }
        public string Key { get; set; }
        public bool ShowInList { get; set; }
        public FieldType FieldType { get; set; }
        public long ProductCategoryId { get; set; }
        public tbl_ProductCategory ProductCategory { get; set; }
        public ICollection<tbl_ProductCustomFieldValues> ProductCustomFieldValues { get; set; }
        public ICollection<tbl_ProductCustomFieldsOptionValues> ProductCustomFieldsOptionValues { get; set; }
    }
}
