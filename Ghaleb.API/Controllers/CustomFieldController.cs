using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomFieldController : ControllerBase
    {
        private readonly ServiceContext _context;

        public CustomFieldController(ServiceContext context)
        {

            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFields(long? brandId = null, long? productCategoryId = null)
        {
            var data = _context.tbl_ProductCustomFields.AsQueryable();

            if (productCategoryId != null)
                data = data.Where(x=>x.ProductCategoryId==productCategoryId);

            return Ok(await data.ToListAsync());
        }
    }
}
