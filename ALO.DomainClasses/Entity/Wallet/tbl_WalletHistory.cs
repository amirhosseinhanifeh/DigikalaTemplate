namespace ALO.DomainClasses.Entity.Wallet
{
    public class tbl_WalletHistory : BaseEntity
	{
        public decimal Cost { get; set; }
        public long WalletId { get; set; }
        public tbl_Wallet Wallet { get; set; }
    }
}
