using ALO.DomainClasses.Entity.Language;
using ALO.DomainClasses.Entity.Menu;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DataAccessLayer.Convention
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tbl_Language>().HasData(
                new tbl_Language
                {
                    Name = "فارسی",
                    LanguageCode = "fa",
                    CreatedDate=DateTime.Now,
                    IsActive=true,
                    IsDelete=false,
                    Id=3,
                    FlagIconId=null
                }
                );
        }
    }
}
