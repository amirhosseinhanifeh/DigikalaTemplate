using ALO.DomainClasses.Entity.Financial;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DataAccessLayer.Config.Financial
{
    public class FinancialAccountConfig : IEntityTypeConfiguration<tbl_FinancialAccount>
    {
        public void Configure(EntityTypeBuilder<tbl_FinancialAccount> builder)
        {
            builder.HasOne(x => x.Users).WithMany(x => x.FinancialAccounts).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
