using ALO.Common.Enums;
using ALO.Service.Interface.Blog;
using ALO.ViewModels.Blog;
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
    public class BlogCommentController : ControllerBase
    {
        private readonly IBlogCommentService _blogcomment;

        public BlogCommentController(IBlogCommentService blogcomment)
        {
            _blogcomment = blogcomment;
        }
        [HttpPost]
        public async Task<ActionResult<bool>> CreateAsync([FromBody] RequestBlogCommentDTO request)
        {
            try
            {
                var result = await _blogcomment.CreateBlogComment(User.UserId(), request);
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
    }
}
