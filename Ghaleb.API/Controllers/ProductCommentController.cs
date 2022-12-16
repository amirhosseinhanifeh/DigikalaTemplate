using ALO.Common.Enums;
using ALO.Service.Interface.Product;
using ALO.ViewModels.ProductComment;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductCommentController : ControllerBase
    {
        private readonly IProductCommentService _productcomment;

        public ProductCommentController(IProductCommentService productcomment)
        {
            _productcomment = productcomment;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ProductCommentForWebsiteDto>>> GetAllAsync(long id)
        {
            try
            {
                var result = await _productcomment.GetProductCommentList(id);
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        [HttpPost]
        public async Task<ActionResult<List<ProductCommentForWebsiteDto>>> CreateAsync([FromBody]RequestProductCommentDto request)
        {
            try
            {
                var result = await _productcomment.CreateProductComment(User.UserId(), request);
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
    }
}
