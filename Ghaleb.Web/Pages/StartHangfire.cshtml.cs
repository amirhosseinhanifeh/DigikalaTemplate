using ALO.DataAccessLayer.DataContext;
using AspNetCore.SEOHelper.Sitemap;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class StartHangfireModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration configuration;
        public StartHangfireModel(ServiceContext context, IWebHostEnvironment env, IConfiguration configuration)
        {
            _context = context;
            _env = env;
            this.configuration = configuration;
        }

        public async Task OnGetAsync()
        {
            RecurringJob.AddOrUpdate(
           "SiteMap",
           () => Start(),
           Cron.Daily);
        }
        public async Task Start()
        {
            var products = await _context.tbl_Products.Where(x => x.IsActive && x.IsDelete != true).ToListAsync();
            var list = new List<SitemapNode>();
            foreach (var item in products)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "product/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

            }
            var blogs = await _context.tbl_Blogs.Where(h => h.IsActive && !h.IsDelete).ToListAsync();
            foreach (var item in blogs)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "mag/post/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

            }
            var pages = await _context.tbl_PageContent.Where(x => x.IsActive && !x.IsDelete).ToListAsync();
            foreach (var item in pages)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "page/" + item.Url, Frequency = SitemapFrequency.Daily });

            }
            var tags = await _context.tbl_ProductTags.Where(x => x.IsActive && !x.IsDelete).ToListAsync();
            foreach (var item in tags)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "search/tag/" + item.Id + "/" + item.Name, Frequency = SitemapFrequency.Daily });

            }
            var brands = await _context.tbl_Brands.Where(x => x.IsActive && !x.IsDelete).ToListAsync();
            foreach (var item in brands)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "search/brand/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

            }
            var categoreis = await _context.tbl_ProductCategories.Where(x => x.IsActive && !x.IsDelete).ToListAsync();
            foreach (var item in categoreis)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "search/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

            }
            var subcategoreis = await _context.tbl_SubProductCategories.Include(x=>x.ProductCategory).Where(x => x.IsActive && !x.IsDelete).ToListAsync();
            foreach (var item in subcategoreis)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "search/" + item.ProductCategoryId + "/" + item.ProductCategory.Url + "/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

            }
            new SitemapDocument().CreateSitemapXML(list, _env.WebRootPath);
        }
    }
}
