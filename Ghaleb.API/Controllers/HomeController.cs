using ALO.DataAccessLayer.DataContext;
using AspNetCore.SEOHelper.Sitemap;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _env;
        private readonly ServiceContext _context;
        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env, ServiceContext context)
        {
            _logger = logger;
            _env = env;
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> CreateSitemapInRootDirectory()
        {
            var products = await _context.tbl_Products.ToListAsync();
            var list = new List<SitemapNode>();
            foreach (var item in products)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = "https://amirprinter.ir/product/"+item.Id+"/"+item.Url, Frequency = SitemapFrequency.Daily });

            }

            new SitemapDocument().CreateSitemapXML(list, _env.ContentRootPath);
            return Ok("sitemap.xml file should be create in root directory");
        }
    }
}
