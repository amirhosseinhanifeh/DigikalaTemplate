using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.Service.Interface.Blog;
using ALO.ViewModels.Blog;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.Blog
{
    public class BlogCommentService : IBlogCommentService
    {
        private readonly ServiceContext _db;

        public BlogCommentService(ServiceContext db)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<bool>> CreateBlogComment(long userId, RequestBlogCommentDTO request)
        {
            try
            {
                tbl_BlogComments model = new tbl_BlogComments()
                {
                    UserId= userId,
                    Body = request.Body,
                    BlogId = request.BlogId,
                    IP = request.IP,
                    IsActive = false,
                    CreatedDate = DateTime.Now
                };
                _db.Create<tbl_BlogComments>(model);
                await _db.SaveChangesAsync();
                return new ListResultViewModel<bool>
                {
                    model = true,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<bool>
                {
                    Message = FailMessage,
                    model = false,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public Task<ListResultViewModel<IEnumerable<BlogCommentForWebsiteDto>>> GetBlogCommentList(long id)
        {
            throw new NotImplementedException();
        }
    }
}
