using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Language;
using ALO.DomainClasses.Entity.Menu;
using ALO.DomainClasses.Entity.PFL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
                    CreatedDate = DateTime.Now,
                    IsActive = true,
                    IsDelete = false,
                    Id = 3,
                    FlagIconId = null
                }
            );
            var role = new tbl_Role()
            {
                Id = 1,
                IsActive = true,
                RoleName = "Admin",
                RoleIndex = "0",
                IsDelete = false,
            };
            modelBuilder.Entity<tbl_Role>().HasData(
    role
);
            var user = new tbl_Users
            {
                Id = 1,
                IsActive = true,
                BrowserName = "Chrome",
                Email = "admin@gmail.com",
                Password = "123456",
                IsDelete = false,
                Mobile = "09121234567",
                Registeredby = Common.Enums.Device.Web,
                IP = "127.0.0.1",
                RegisteredDate = DateTime.Now,
                LastLogin = DateTime.Now,


            };
            modelBuilder.Entity<tbl_Users>().HasData(
                user
            );
            modelBuilder.Entity<tbl_Profile>().HasData(
                                 new DomainClasses.Entity.PFL.tbl_Profile
                                 {
                                     Id = 1,
                                     FirstName = "مدیر",
                                     LastName = "سایت",
                                     Gender = Common.Enums.Gender.Male,
                                     NationalCode = "1234567891"
                                 });
        }
    }
}
