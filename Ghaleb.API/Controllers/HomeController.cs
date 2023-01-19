using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using AspNetCore.SEOHelper.Sitemap;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;
        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment env, ServiceContext context, IConfiguration configuration)
        {
            _logger = logger;
            _env = env;
            _context = context;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<IActionResult> CreateSitemapInRootDirectory()
        {
            var products = await _context.tbl_Products.ToListAsync();
            var list = new List<SitemapNode>();
            foreach (var item in products)
            {
                list.Add(new SitemapNode { LastModified = DateTime.UtcNow, Priority = 0.8, Url = "https://amirprinter.ir/product/" + item.Id + "/" + item.Url, Frequency = SitemapFrequency.Daily });

            }

            new SitemapDocument().CreateSitemapXML(list, _env.ContentRootPath);
            return Ok("sitemap.xml file should be create in root directory");
        }
        [HttpGet]
        public async Task<IActionResult> GetLinks()
        {
            var links = await _context.tbl_GroupLinkManagements.Include(x => x.LinkManagements).Where(x => x.IsActive && x.IsDelete != true).Select(x => new
            {
                x.Id,
                x.Title,
                x.RouteName,
                links = x.LinkManagements.Where(x=>x.IsActive && x.IsDelete ==false).OrderBy(x=>x.Order).Select(h => new
                {
                    Image = h.Image.BindImage(_configuration),
                    h.Description,
                    h.Id,
                    h.Link,
                    h.Title,
                })
            }).ToListAsync();
            var blocks = await _context.tbl_Blocks.Where(x => x.IsActive && x.IsDelete != true).Select(x => new
            {
                x.Id,
                x.Link,
                x.Description,
                Image=x.Image.BindImage(_configuration),
                x.RouteName,
            }).ToListAsync();
            return Ok(new
            {
                links,
                blocks
            });
        }
    }
}
