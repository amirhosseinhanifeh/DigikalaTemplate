namespace ALO.DomainClasses.Entity.Account
{
    public class tbl_UserAddresses:BaseEntity {


        public string ReciverName { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
        public string Address { get; set; }
        public int Pelak { get; set; }
        public int Vahed { get; set; }
        public bool IsDefault { get; set; }
        public string PostalCode { get; set; }
        public long UserId { get; set; }
        public tbl_Users User { get; set; }
    }
}