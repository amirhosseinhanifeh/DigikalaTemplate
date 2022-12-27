using ALO.DomainClasses.Entity.PFL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Config.Profile
{
    public class ProfileConfig : IEntityTypeConfiguration<tbl_Profile>
    {
        public void Configure(EntityTypeBuilder<tbl_Profile> builder)
        {
            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(60);
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(60);
            builder.HasOne(x => x.Avatar).WithMany(x => x.Profile).HasForeignKey(x => x.AvatarId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
