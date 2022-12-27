using ALO.DomainClasses.Entity.City;
using ALO.DomainClasses.Entity.Country;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Collections.Generic;

namespace ALO.DomainClasses.Config.Country
{
    public class CountryConfig : IEntityTypeConfiguration<tbl_Country>
    {
        public void Configure(EntityTypeBuilder<tbl_Country> builder)
        {
            builder.HasMany(x => x.Cities).WithOne(x => x.Country).HasForeignKey(x => x.CountryId).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.Name).IsRequired();

            //tbl_Country country = new tbl_Country { Name = "ایران" };
            //builder.HasData(country);
        }
    }
}
