using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductCustomFieldsController : ControllerBase
    {

        private readonly IProductCategoryService _productCategory;

        public ProductCustomFieldsController(IProductCategoryService productCategory)
        {
            _productCategory = productCategory;
        }


        [HttpGet]
        public async Task<IActionResult> GetFields(long subcategoryId)
        {
            
            return Ok(await _productCategory.GetFields(subcategoryId));
        }
    }
}
