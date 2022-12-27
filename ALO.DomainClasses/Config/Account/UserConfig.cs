using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.PFL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Config.Account
{
    public class UserConfig : IEntityTypeConfiguration<tbl_Users>
    {
        public void Configure(EntityTypeBuilder<tbl_Users> builder)
        {
            builder.HasOne(a => a.Profile)
            .WithOne(b => b.User).HasForeignKey<tbl_Profile>(x=>x.Id).OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.Mobile).IsRequired().HasMaxLength(11);
            builder.HasMany(x => x.Roles).WithMany(x => x.Users).UsingEntity(options =>
            {
                options.ToTable("tbl_UserInRoles");
            });
            //builder.HasData(new tbl_Users { Email = "", Password = "123", Mobile = "09354547295", Registeredby = 0, RegisterStatus = 0, IP = "192.168.0.1" });

        }
    }
}
