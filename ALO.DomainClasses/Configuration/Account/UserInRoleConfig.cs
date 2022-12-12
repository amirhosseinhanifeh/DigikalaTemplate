using ALO.DomainClasses.Entity.Account;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Configuration.Account
{
    public class UserInRoleConfig : IEntityTypeConfiguration<tbl_UserInRole>
    {
        public void Configure(EntityTypeBuilder<tbl_UserInRole> builder)
        {
            builder
       .HasKey(bc => new { bc.UserId, bc.RoleId });
                builder.HasOne(bc => bc.Role)
                .WithMany(b => b.tbl_UserInRoles)
                .HasForeignKey(bc => bc.RoleId);

                builder.HasOne(bc => bc.User)
                .WithMany(c => c.tbl_UserInRole)
                .HasForeignKey(bc => bc.UserId);
        }
    }
}
