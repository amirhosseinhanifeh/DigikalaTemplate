using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses;
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
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using Hangfire;
using AspNetCore.ReCaptcha;
using Microsoft.AspNetCore.HttpOverrides;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using Hangfire.Dashboard;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages().AddRazorRuntimeCompilation().AddRazorPagesOptions(options =>
{
    options.Conventions.AddPageRoute("/Search", "Search/Category/{CategoryId?}/{CategoryUrl?}");
    options.Conventions.AddPageRoute("/Search", "Search/Brand/{brandId?}/{brandName?}");
    options.Conventions.AddPageRoute("/Search", "Search/Tag/{tagId}/{tagName}");
    options.Conventions.AddPageRoute("/Search", "Search/Category/{categoryId?}/{categoryUrl?}/SubCategory/{subCategoryId?}/{subCategoryUrl?}");
    options.Conventions.AddPageRoute("/Search", "Search/Maincategory/{maincategoryId?}/{maincategoryUrl?}");
}); ;
builder.Services.AddDbContext<ServiceContext>
    (options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHangfire(x => x.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHangfireServer();
builder.Services.AddSingleton<HtmlEncoder>(
  HtmlEncoder.Create(allowedRanges: new[] { UnicodeRanges.BasicLatin,
                                            UnicodeRanges.Arabic}));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromDays(365);
        options.SlidingExpiration = true;
        options.AccessDeniedPath = "/Forbidden/";
        options.Events.OnRedirectToLogin = context =>
        {
            if (IsAdminContext(context))
            {
                var redirectPath = new Uri(context.RedirectUri);
                context.Response.Redirect("/admin/login" + redirectPath.Query);
            }
            else
            {
                context.Response.Redirect(context.RedirectUri);
            }
            return Task.CompletedTask;
        };
    });
var config = new MapperConfiguration(cfg =>
{
    cfg.AddProfile(new RegisterProfile());

    cfg.AddProfile(new FinancialProfile());
    cfg.CreateMap(typeof(BaseSeo), typeof(BaseEntity));
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper();
builder.Services.AddSingleton(config);
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IFinancialService, FinancialService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductCommentService, ProductCommentService>();
builder.Services.AddScoped<IBasketOrderService, BasketOrderService>();
builder.Services.AddScoped<ISpecialSellService, SpecialSellService>();
builder.Services.AddScoped<IPageContentService, PageContentService>();
builder.Services.AddScoped<IProductCategoryService, ProductCategoryService>();
builder.Services.AddScoped<IProductSubCategoryService, ProductSubCategoryService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IBlogCommentService, BlogCommentService>();
builder.Services.AddScoped<IFormContactUsService, FormContactUsService>();
builder.Services.AddScoped<IContactUsService, ContactUsService>();
builder.Services.AddScoped<ISocialNetworkService, SocialNetworkService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IBlogCategoryService, BlogCategoryService>();
builder.Services.AddScoped<ISeoService, SeoService>();
builder.Services.AddReCaptcha(builder.Configuration.GetSection("ReCaptcha"));

builder.Services.AddScoped<CookieHelper>();
builder.Services.AddScoped<WebsiteBase>();
var app = builder.Build();
// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}
app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404)
    {
        context.Request.Path = "/notfound";
        await next();   
    }
});
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseHangfireDashboard(options: new DashboardOptions
{
    Authorization = new[] { new DashboardNoAuthorizationFilter() }
});
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapRazorPages();

app.MapControllerRoute(
    name: "MyArea",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});
app.Run();

static bool IsAdminContext(RedirectContext<CookieAuthenticationOptions> context)
{
    return context.Request.Path.StartsWithSegments("/admin");
}
public class DashboardNoAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext dashboardContext)
    {
        return true;
    }
}