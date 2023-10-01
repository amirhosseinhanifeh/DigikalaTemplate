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
           () =>Start(),
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

            new SitemapDocument().CreateSitemapXML(list, _env.WebRootPath);
        }
    }
}
