using ALO.DomainClasses.Entity.City;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ALO.DomainClasses.Config.City
{
    public class CityConfig : IEntityTypeConfiguration<tbl_City>
    {
        public void Configure(EntityTypeBuilder<tbl_City> builder)
        {

            builder.Property(x => x.Name).IsRequired();

           // builder.HasOne(e => e.Country).WithMany(c => c.Cities).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
