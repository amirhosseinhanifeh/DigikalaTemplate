using ALO.DataAccessLayer.Convention;
using ALO.DataAccessLayer.UnitOfWork;
using ALO.DomainClasses;
using ALO.DomainClasses.Config.Account;
using ALO.DomainClasses.Config.City;
using ALO.DomainClasses.Config.Country;
using ALO.DomainClasses.Config.Financial;
using ALO.DomainClasses.Config.Profile;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Basket;
using ALO.DomainClasses.Entity.Blog;
using ALO.DomainClasses.Entity.City;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.Entity.Country;
using ALO.DomainClasses.Entity.Financial;
using ALO.DomainClasses.Entity.Forms;
using ALO.DomainClasses.Entity.IMG;
using ALO.DomainClasses.Entity.Language;
using ALO.DomainClasses.Entity.LinkManagement;
using ALO.DomainClasses.Entity.Menu;
using ALO.DomainClasses.Entity.MSG;
using ALO.DomainClasses.Entity.Order;
using ALO.DomainClasses.Entity.Permission;
using ALO.DomainClasses.Entity.PFL;
using ALO.DomainClasses.Entity.Product;
using ALO.DomainClasses.Entity.SpecialSell;
using ALO.DomainClasses.Entity.Wallet;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace ALO.DataAccessLayer.DataContext
{
    public class ServiceContext : DbContext, IUnitOfWork,IDisposable
    {
        public ServiceContext(DbContextOptions<ServiceContext> options) : base(options)
        {
        }


        #region DbSet


        public DbSet<tbl_Users> tbl_Users { get; set; }
        public DbSet<tbl_UserAddresses> tbl_UserAddresses { get; set; }

        public DbSet<tbl_Role> tbl_Role { get; set; }

        public DbSet<tbl_City> tbl_City { get; set; }

        public DbSet<tbl_Country> tbl_Country { get; set; }

        public DbSet<tbl_Message> tbl_Message { get; set; }


        public DbSet<tbl_Profile> tbl_Profile { get; set; }

        public DbSet<tbl_Image> tbl_Image { get; set; }

        public DbSet<tbl_FinancialAccount> tbl_FinancialAccount { get; set; }

        public DbSet<tbl_PhoneVerification> tbl_PhoneVerification { get; set; }

        #region Product


        public DbSet<tbl_Brands> tbl_Brands { get; set; }
        public DbSet<tbl_Color> tbl_Colors { get; set; }
        public DbSet<tbl_Product> tbl_Products { get; set; }
        public DbSet<tbl_MainProductCategory> tbl_MainProductCategory { get; set; }
        public DbSet<tbl_ProductCategory> tbl_ProductCategories { get; set; }
        public DbSet<tbl_SubProductCategory> tbl_SubProductCategories { get; set; }
        public DbSet<tbl_ProductComment> tbl_ProductComments { get; set; }
        public DbSet<tbl_ProductRating> tbl_ProductRatings { get; set; }
        public DbSet<tbl_ProductCustomFields> tbl_ProductCustomFields { get; set; }
        public DbSet<tbl_ProductCustomFieldValues> tbl_ProductCustomFieldValues { get; set; }
        public DbSet<tbl_ProductCustomFieldsOptionValues> tbl_ProductCustomFieldsOptionValues { get; set; }
        public DbSet<tbl_ProductVisits> tbl_ProductVisits { get; set; }
        public DbSet<tbl_ProductTags> tbl_ProductTags { get; set; }
        public DbSet<tbl_ProductPriceHistory> tbl_ProductPriceHistory{ get; set; }
        public DbSet<tbl_ProductPriceOption> tbl_ProductPriceOptions{ get; set; }
        public DbSet<tbl_ProductPriceOptionValue> tbl_ProductPriceOptionValues{ get; set; }
        public DbSet<tbl_ProductGuarantee> tbl_ProductGuarantees { get; set; }
        public DbSet<tbl_DeliveryPrice> tbl_DeliveryPrices { get; set; }


        #endregion

        #region Basket
        public DbSet<tbl_BasketOrder> tbl_BasketOrders { get; set; }
        public DbSet<tbl_BasketOrderProducts> tbl_BasketOrderProducts { get; set; }

        #endregion

        #region PageContent

        public DbSet<tbl_PageContent> tbl_PageContent { get; set; }
        public DbSet<tbl_ContactUsDetails> tbl_ContactUsDetails { get; set; }
        public DbSet<tbl_SocialNetworks> tbl_SocialNetworks { get; set; }
        public DbSet<tbl_Seo> tbl_Seos { get; set; }
        public DbSet<tbl_SlideShow> tbl_SlideShows { get; set; }
        public DbSet<tbl_Faq> tbl_Faq { get; set; }
        public DbSet<tbl_Blocks> tbl_Blocks { get; set; }
        public DbSet<tbl_LinkManagement> tbl_LinkManagements { get; set; }
        public DbSet<tbl_GroupLinkManagement> tbl_GroupLinkManagements { get; set; }
        public DbSet<tbl_Tools> tbl_Tools { get; set; }

        #endregion

        #region SpecialSell

        public DbSet<tbl_SpecialSell> tbl_SpecialSells { get; set; }
        public DbSet<tbl_SpecialSellProducts> tbl_SpecialSellProducts { get; set; }

        #endregion

        #region Blog

        public DbSet<tbl_Blog> tbl_Blogs { get; set; }
        public DbSet<tbl_BlogCategory> tbl_BlogCategories { get; set; }
        public DbSet<tbl_BlogType> tbl_BlogType { get; set; }
        public DbSet<tbl_BlogComments> tbl_BlogComments { get; set; }

        #endregion

        #region Forms
        public DbSet<tbl_FormContantUs> tbl_FormContantUs { get; set; }
        public DbSet<tbl_FormRepair> tbl_FormRepairs { get; set; }


        #endregion

        #region Order
        public DbSet<tbl_Order> tbl_Orders { get; set; }
        public DbSet<tbl_OrderDetails> tbl_OrderDetails { get; set; }
        public DbSet<tbl_Wallet> tbl_Wallets { get; set; }
        public DbSet<tbl_WalletHistory> tbl_WalletHistories { get; set; }


		#endregion

		#region Menu
		public DbSet<tbl_Menu> tbl_Menus { get; set; }
		public DbSet<tbl_Permission> tbl_Permissions { get; set; }
        #endregion

        #region Language
        public DbSet<tbl_Language> tbl_Languages { get; set; }

        #endregion
        #endregion



        #region UnitOfWork


        public TEntity Create<TEntity>(TEntity entity) where TEntity : class
        {
            Entry(entity).State = EntityState.Added;
            return entity;
        }

        public TEntity CreateBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            Entry(entity).Entity.CreatedDate = DateTime.Now;
            Entry(entity).State = EntityState.Added;
            return entity;
        }

        public void CreateRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            throw new NotImplementedException();
        }

        public void CreateRangeBaseEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity
        {
            throw new NotImplementedException();
        }

        public void Delete<TEntity>(TEntity entity) where TEntity : class
        {
            Entry(entity).State = EntityState.Deleted;
        }

        public void DeletedBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            Entry(entity).State = EntityState.Deleted;
        }

        public void DeletedRangeBaseEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity
        {
            throw new NotImplementedException();
        }

        public void DeleteRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            throw new NotImplementedException();
        }

        public TEntity GetBaseEntity<TEntity>(Expression<Func<TEntity, bool>> expression, string[] includes = null) where TEntity : BaseEntity
        {
            var data = Set<TEntity>().AsQueryable();
            if (includes != null)
            {
                foreach (var item in includes)
                {
                    data = data.Include(item);
                }
            }
            return data.Where(x => EF.Property<bool>(x, "IsDelete") == false && EF.Property<bool>(x, "IsActive") == true).FirstOrDefault(expression);
        }

        public async Task<TEntity> GetAsync<TEntity>(Expression<Func<TEntity, bool>> expression = null, string[] includes = null) where TEntity : class
        {
            var data = Set<TEntity>().Where(x => EF.Property<bool>(x, "IsDelete") == false && EF.Property<bool>(x, "IsActive") == true).AsQueryable();
            if (includes != null)
            {
                foreach (var item in includes)
                {
                    data = data.Include(item);
                }
            }
            if (expression != null)
            {
                return await data.FirstOrDefaultAsync(expression);

            }
            return await data.FirstOrDefaultAsync();

        }

        public IQueryable<TEntity> GetAllAsync<TEntity>(Expression<Func<TEntity, bool>> expression = null, string[] includes = null) where TEntity : class
        {
            var data = Set<TEntity>().AsQueryable();
            if (includes != null)
            {
                foreach (var item in includes)
                {
                    data = data.Include(item);
                }
            }
            if (expression != null)
            {
                data= data.Where(expression);
            }
            return  data.Where(x=> EF.Property<bool>(x, "IsDelete") == false).AsQueryable();

        }

        public void SoftDeletedBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            Entry(entity).Entity.ModifiedDate = DateTime.Now;
            Entry(entity).Entity.IsDelete = true;
            Entry(entity).Entity.IsActive = false;
            //if (Thread.CurrentPrincipal.Identity.IsAuthenticated)
            //    Entry(entity).Entity.Modifiedby = Thread.CurrentPrincipal.Identity.Name.ToGuid();

            Entry(entity).State = EntityState.Modified;
        }

        public void UpdateBaseEntity<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            Entry(entity).Entity.ModifiedDate = DateTime.Now;
            //if (Thread.CurrentPrincipal.Identity.IsAuthenticated)
            //    Entry(entity).Entity.Modifiedby = Thread.CurrentPrincipal.Identity.Name.ToGuid();

            Entry(entity).State = EntityState.Modified;
        }

        public new void UpdateRange<TEntity>(IEnumerable<TEntity> entities) where TEntity : class
        {
            throw new NotImplementedException();
        }

        public void UpdateRangeBaseEntity<TEntity>(IEnumerable<TEntity> entities) where TEntity : BaseEntity
        {
            throw new NotImplementedException();
        }

        #endregion



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tbl_Product>().HasMany(x => x.Images)
                .WithMany(x => x.ProductImages)
                .UsingEntity(options =>
                {
                    options.ToTable("ProductImages");
                });
            modelBuilder.Entity<tbl_Product>().HasOne(x => x.Image)
    .WithMany(x => x.ProductMainImages)
    .HasForeignKey(x => x.ImageId);
            modelBuilder.Entity<tbl_Product>().HasMany(x => x.Users)
.WithMany(x => x.Products).UsingEntity(x=>x.ToTable("UserFavouriteProducts"));



            modelBuilder.Entity<tbl_ProductPriceHistory>().HasMany(x => x.ProductPriceOptionValues)
                .WithMany(x => x.ProductPriceHistories).UsingEntity(x => x.ToTable("tbl_ProductPriceHistoryOptionValues"));


            modelBuilder.Seed();
            //foreach (var entityType in modelBuilder.Model.GetEntityTypes()
            //    .SelectMany(x => x.GetProperties())
            //    .Where(x => x.Name == "Id"))
            //{
            //    entityType.SetDefaultValue(Guid.NewGuid());
            //}

            //foreach (var entityType in modelBuilder.Model.GetEntityTypes()
            //    .SelectMany(x => x.GetProperties())
            //    .Where(x => x.Name == "CreatedDate"))
            //{
            //    entityType.SetDefaultValue(DateTime.Now);
            //}
            //foreach (var entityType in modelBuilder.Model.GetEntityTypes()
            //    .SelectMany(x => x.GetProperties())
            //    .Where(x => x.ClrType == typeof(decimal) || x.ClrType == typeof(decimal?)))
            //{
            //    entityType.Relational().ColumnType = "decimal(18, 0)";
            //}
            //var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
            //             .Where(t => t.GetInterfaces().Any(gi => gi.IsGenericType && gi.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>))).ToList();

            //foreach (var type in typesToRegister)
            //{
            //    dynamic configurationInstance = Activator.CreateInstance(type);
            //    modelBuilder.ApplyConfiguration(configurationInstance);
            //}
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new CityConfig());
            modelBuilder.ApplyConfiguration(new ProfileConfig());
            modelBuilder.ApplyConfiguration(new CountryConfig());
            modelBuilder.ApplyConfiguration(new FinancialAccountConfig());
            //modelBuilder.ApplyConfiguration(new CourtConfig());

            base.OnModelCreating(modelBuilder);
        }

        void IUnitOfWork.Update<TEntity>(TEntity entity)
        {
            throw new NotImplementedException();
        }
        public override void Dispose()
        {
            base.Dispose();
        }
    }
}
