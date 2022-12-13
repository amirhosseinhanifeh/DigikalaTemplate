using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryService _productCategory;
        private readonly ServiceContext _context;
        public ProductCategoryController(IProductCategoryService productCategory, ServiceContext context)
        {
            _productCategory = productCategory;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<CategoryForSiteHeaderDto>>> GetAllAsync()
        {
            try
            {
                var result = await _productCategory.GetCategoryForSiteHeader();
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        [HttpGet]
        public async Task<ActionResult<GetCategoryDetailForWebsiteDTO>> GetAsync([FromQuery] string url)
        {
            try
            {
                var result = await _productCategory.GetProductCategoryForWebsite(url);


                return Ok(new { Data = result, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var data = await _context.tbl_ProductCategories
                .Include(x => x.ProductCustomFields)
                .ThenInclude(h => h.ProductCustomFieldsOptionValues)
                .Include(x => x.SubProductCategories)
                .FirstOrDefaultAsync(h => h.Id == id);
            if(data ==null)
            {
                return Ok(null);
            }
            return Ok(new
            {
                Id = data.Id,
                Name = data.Title,
                PageTitle = data.PageTitle,
                fields = data.ProductCustomFields.Where(h => h.FieldType == ALO.DomainClasses.Entity.Product.FieldType.DROPDOWN).Select(h => new
                {
                    h.Id,
                    h.Name,
                    Options = h.ProductCustomFieldsOptionValues.Select(g => new
                    {
                        g.Id,
                        g.Value
                    })
                }),
                subCategories = data.SubProductCategories.Select(h => new
                {
                    h.Id,
                    h.Title,
                    h.Url
                })
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetSub(long id)
        {
            var data = await _context.tbl_SubProductCategories.Include(x=>x.ProductCategory).ThenInclude(x => x.ProductCustomFields).ThenInclude(h => h.ProductCustomFieldsOptionValues).FirstOrDefaultAsync(h => h.Id == id);
            return Ok(new
            {
                Id = data.Id,
                Name = data.Title,
                PageTitle = data.PageTitle,
                fields = data.ProductCategory.ProductCustomFields.Where(h => h.FieldType == ALO.DomainClasses.Entity.Product.FieldType.DROPDOWN).Select(h => new
                {
                    h.Id,
                    h.Name,
                    Options = h.ProductCustomFieldsOptionValues.Select(g => new
                    {
                        g.Id,
                        g.Value
                    })
                })
            });
        }
    }
}
