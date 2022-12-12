using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly ServiceContext _context;

        public BrandController(ServiceContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.tbl_Brands.Where(x => x.IsDelete == false && x.IsActive).Select(x => new { Id = x.Id, Image = x.Logo.BindImage(), Name = x.Name }).ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var data = await _context.tbl_Brands.Include(x=>x.Logo).Include(x=>x.MainProductCategory).ThenInclude(x=>x.ProductCategories).FirstOrDefaultAsync(x => x.IsDelete == false && x.IsActive && x.Id == id);
            return Ok(new
            {
                Id = data.Id,
                Title = data.Name,
                Image = data.Logo.BindImage(),
                Description=data.Description,
                Categories=data.MainProductCategory.ProductCategories.Select(h=>new {Name = h.Title ,Id=h.Id})
            });

        }
    }
}
