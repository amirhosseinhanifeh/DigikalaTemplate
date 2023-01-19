using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses;
using ALO.MappingProfile;
using ALO.MappingProfile.Account;
using ALO.MappingProfile.Financial;
using ALO.Service.Interface.Account;
using ALO.Service.Interface.Basket;
using ALO.Service.Interface.Blog;
using ALO.Service.Interface.FinancialAccount;
using ALO.Service.Interface.Forms;
using ALO.Service.Interface.Image;
using ALO.Service.Interface.Order;
using ALO.Service.Interface.PageContent;
using ALO.Service.Interface.Product;
using ALO.Service.Interface.Profile;
using ALO.Service.Interface.SpecialSell;
using ALO.Service.Service.Account;
using ALO.Service.Service.Basket;
using ALO.Service.Service.Blog;
using ALO.Service.Service.FinancialAccount;
using ALO.Service.Service.Forms;
using ALO.Service.Service.ImageService;
using ALO.Service.Service.Order;

using ALO.Service.Service.PageContent;
using ALO.Service.Service.Product;
using ALO.Service.Service.Profile;
using ALO.Service.Service.SpecialSell;
using ALO.ViewModels;
using AspNetCore.SEOHelper;
using AutoMapper;
using AyandeNama.Web.Helpers;
using Ghaleb.API.Helpers;
using Hangfire;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Ghaleb.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment _env;
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddScoped<CookieHelper>();
            services.AddScoped<WebsiteBase>();
            services.AddControllersWithViews();
            services.AddMvc();

            services.AddRazorPages()
        .AddRazorRuntimeCompilation();
            services.AddDbContext<ServiceContext>
                (options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), opts => {
                    opts.UseNetTopologySuite();
                    opts.EnableRetryOnFailure();
                    }));

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new RegisterProfile());

                cfg.AddProfile(new FinancialProfile());
                cfg.CreateMap(typeof(BaseSeo), typeof(BaseEntity));
            });
            services.AddHangfire(x => x.UseSqlServerStorage(Configuration.GetConnectionString("DefaultConnection")));
            services.AddHangfireServer();
            services.AddHttpContextAccessor();
            services.AddAutoMapper();
            services.AddSingleton(config);
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IFinancialService, FinancialService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductCommentService, ProductCommentService>();
            services.AddScoped<IBasketOrderService, BasketOrderService>();
            services.AddScoped<ISpecialSellService, SpecialSellService>();
            services.AddScoped<IPageContentService, PageContentService>();
            services.AddScoped<IProductCategoryService, ProductCategoryService>();
            services.AddScoped<IProductSubCategoryService, ProductSubCategoryService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<IBlogCommentService, BlogCommentService>();
            services.AddScoped<IFormContactUsService, FormContactUsService>();
            services.AddScoped<IContactUsService, ContactUsService>();
            services.AddScoped<ISocialNetworkService, SocialNetworkService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IBlogCategoryService, BlogCategoryService>();
            services.AddScoped<ISeoService, SeoService>();
            services.AddOptions<CaptchaSettings>().BindConfiguration("Captcha");
            services.AddTransient<CaptchaVerificationService>();
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromDays(20);
        options.SlidingExpiration = true;
        options.AccessDeniedPath = "/Forbidden/";
        options.LoginPath = "/admin/login";
    });
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //.AddJwtBearer(options =>
            //{
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = true,
            //        ValidateAudience = true,
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        ValidIssuer = Configuration["Jwt:Issuer"],
            //        ValidAudience = Configuration["Jwt:Issuer"],
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
            //    };
            //    options.Events = new JwtBearerEvents
            //    {
            //        OnMessageReceived = context =>
            //        {
            //            var accessToken = context.Request.Query["access_token"];

            //            // If the request is for our hub...
            //            var path = context.HttpContext.Request.Path;
            //            if (!string.IsNullOrEmpty(accessToken))
            //            {
            //                // Read the token out of the query string
            //                context.Token = accessToken;
            //            }
            //            return Task.CompletedTask;
            //        }
            //    };
            //});
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {


            app.UseDeveloperExceptionPage();
            app.UseSwagger();

            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ghaleb.API v1"));
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseXMLSitemap(env.ContentRootPath);
            app.UseEndpoints(endpoints =>
            {

                endpoints.MapControllerRoute(
                  name: "areas",
                  pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
                );
            });
            app.UseHangfireDashboard();
            app.UseStaticFiles();
        }
    }
}
