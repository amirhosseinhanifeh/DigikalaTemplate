using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using AspNetCore.SEOHelper.Sitemap;
using Hangfire;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class StartHangfireModel : PageModel
    {
        private readonly ServiceContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        public StartHangfireModel(ServiceContext context, IWebHostEnvironment env, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _env = env;
            this.configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        public async Task OnGetAsync()
        {
            RecurringJob.AddOrUpdate(
           "SiteMap",
           () => Start(),
           Cron.Daily);

            RecurringJob.AddOrUpdate(
"Torob",
() => StartTorob(),
Cron.Daily);
        }
        public async Task StartTorob()
        {
            var products = await _context.tbl_Products.Include(x => x.TorobProducts).Where(h => h.IsActive && !h.IsDelete && h.TorobLink != null).ToListAsync();
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
            client.DefaultRequestHeaders.Add("Accept", "text/html");
            client.DefaultRequestHeaders.Add("Accept-Language", "en-US,en;q=0.5");
            List<tbl_TorobProducts> torobs = new List<tbl_TorobProducts>();
            foreach (var product in products)
            {
                product.TorobProducts.Clear();
                product.TorobProducts = new List<tbl_TorobProducts>();
                using (var response = await client.GetAsync(product.TorobLink))
                {
                    using (var content = response.Content)
                    {
                        // read answer in non-blocking way
                        var result = await content.ReadAsStringAsync();
                        var document = new HtmlDocument();
                        document.LoadHtml(result);
                        var nodes = document.DocumentNode.Descendants(0)
        .Where(n => n.HasClass("shop-card"));
                        foreach (var node in nodes)
                        {
                            var shopName = node.Descendants(0).Where(n => n.HasClass("shop-name")).FirstOrDefault();
                            var price = node.Descendants(0).Where(n => n.HasClass("price")).FirstOrDefault();
                            var lastUpdate = node.Descendants(0).Where(n => n.HasClass("last_price_change_date")).FirstOrDefault();
                            var city = node.Descendants(0).Where(n => n.HasClass("city-name")).FirstOrDefault();
                            torobs.Add(new tbl_TorobProducts
                            {
                                ProductId = product.Id,
                                LastUpdate = lastUpdate?.InnerText,
                                Price = price.InnerText,
                                ShopName = shopName.InnerText,
                                City = city.InnerHtml
                            });

                        }
                        //Some work with page....
                    }
                }

            }
            await _context.tbl_TorobProducts.AddRangeAsync(torobs);
            await _context.SaveChangesAsync();
            // get answer in non-blocking way

        }
        public async Task Start()
        {
            var products = await _context.tbl_Products.Include(x => x.ProductPriceHistories).Where(x => x.IsActive && x.IsDelete != true).ToListAsync();
            var list = new List<SitemapNode>();
            foreach (var item in products)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "product/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });
                var colors = products.SelectMany(x => x.ProductPriceHistories).Select(x => x.ColorId).Distinct();
                foreach (var color in colors)
                {
                    list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "product/" + item.Id + "/" + item.Url + "?color=" + color.Value, Frequency = SitemapFrequency.Daily });

                }
            }
            var blogs = await _context.tbl_Blogs.Where(h => h.IsActive && !h.IsDelete).ToListAsync();
            foreach (var item in blogs)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "blog/post/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

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
            var subcategoreis = await _context.tbl_SubProductCategories.Include(x => x.ProductCategory).Where(x => x.IsActive && !x.IsDelete).ToListAsync();
            foreach (var item in subcategoreis)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = configuration["SiteSetting:Url"] + "search/" + item.ProductCategoryId + "/" + item.ProductCategory.Url + "/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

            }
            new SitemapDocument().CreateSitemapXML(list, _env.WebRootPath);
        }
    }
}
