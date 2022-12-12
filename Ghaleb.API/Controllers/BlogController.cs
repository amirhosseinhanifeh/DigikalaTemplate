using ALO.Common.Enums;
using ALO.Service.Interface.Blog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using static ALO.Common.Messages.Message;
using System.Threading.Tasks;
using ALO.ViewModels.Blog;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blog;

        public BlogController(IBlogService blog)
        {
            _blog = blog;
        }
        [HttpGet]
        public async Task<ActionResult<List<BlogListForWebsiteDTO>>> GetAllAsync([FromQuery] string category = null
    )
        {
            try
            {
                var result = await _blog.GetBlogsForWebsite(category);
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        [HttpGet]
        public async Task<ActionResult<BlogDetailsForHomeDto>> GetAsync([FromQuery] string url = null
)
        {
            try
            {
                var result = await _blog.GetBlogDetails(url);
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
    }
}
