using ALO.ViewModels.Blog;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Blog
{
    public interface IBlogCommentService
    {
        Task<ListResultViewModel<IEnumerable<BlogCommentForWebsiteDto>>> GetBlogCommentList(long id);
        Task<ListResultViewModel<bool>> CreateBlogComment(long userId,RequestBlogCommentDTO request);
    }
}
