using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertDt;
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Blog;
using ALO.ViewModels.Blog;
using ALO.ViewModels.Blog.Admin;
using ALO.ViewModels.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.Blog
{
    public class BlogService : RepositoryService<tbl_BlogCategory>, IBlogService
    {
        private readonly ServiceContext _db;
        public BlogService(ServiceContext db, IMapper mapper) : base(db, mapper)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<IEnumerable<BlogListForWebsiteDTO>>> GetBlogsForWebsite(string category = null)
        {
            try
            {

                var result = (await _db.GetAllAsync<tbl_Blog>(x => !string.IsNullOrEmpty(category) ? x.BlogCategory.Url == category : true, new string[] { "BlogCategory", "Image" }).ToListAsync())
                    .Select(x => new BlogListForWebsiteDTO
                    {
                        Id = x.Id,
                        Abstract = x.Abstract,
                        Category = x.BlogCategory.Title,
                        Title = x.Title,
                        Image = x.Image.BindImage(),
                        MetaDescription = x.MetaDescription,
                        MetaKeyword = x.MetaKeyword.Split(","),
                        PageTitle = x.PageTitle,
                        Url = x.Url,
                        Date = x.CreatedDate.ConvertToPesainDate().toPersianNumber()

                    }).ToList();
                return new ListResultViewModel<IEnumerable<BlogListForWebsiteDTO>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<BlogListForWebsiteDTO>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<BlogDetailsForHomeDto>> GetBlogDetails(string url)
        {
            try
            {
                var query = await _db.GetAsync<tbl_Blog>(x => x.Url == url, new string[] { "BlogCategory", "Image", "BlogComments","BlogComments.User","BlogComments.User.Profile" });
                var Result = new BlogDetailsForHomeDto
                {
                    Abstract = query.Abstract,
                    Category = query.BlogCategory.Title,
                    Description = query.Description,
                    Image = query.Image.BindImage(),
                    Title = query.Title,
                    MetaDescription = query.MetaDescription,
                    MetaKeyword = query.MetaKeyword,
                    PageTitle = query.PageTitle,
                    Url = query.Url,
                    Id = query.Id,
                    Comments = query.BlogComments.Select(y => new BlogCommentForWebsiteDto
                    {
                        Body = y.Body,
                        FullName = y.User.Profile.FirstName + " " + y.User.Profile.LastName,
                        Response = y.Response,
                        Date = y.CreatedDate.ConvertToPesainDate().toPersianNumber()

                    }).ToList()

                };
                return new ListResultViewModel<BlogDetailsForHomeDto>
                {
                    model = Result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<BlogDetailsForHomeDto>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<IEnumerable<BlogListForAdminDTO>>> GetBlogListForAdmin()
        {
            try
            {

                var result = (await _db.GetAllAsync<tbl_Blog>(includes: new string[] { "BlogCategory" }).ToListAsync())
                    .Select((x, i) => new BlogListForAdminDTO
                    {
                        Row = i + 1,
                        Id = x.Id,
                        Category = x.BlogCategory.Title,
                        Title = x.Title,
                        Status = x.IsActive ? "فعال" : "غیرفعال"
                    }).ToList();
                return new ListResultViewModel<IEnumerable<BlogListForAdminDTO>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<BlogListForAdminDTO>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<bool>> CreateUpdate(RequestBlogDTO model)
        {
            try
            {
                if (!_db.tbl_Blogs.Any(y => y.Url == model.Url && y.IsDelete != true))
                {
                    if (model.Id != null)
                    {

                        _db.UpdateBaseEntity(new tbl_Blog
                        {

                            Id = model.Id.GetValueOrDefault(),
                            MetaDescription = model.MetaDescription,
                            MetaKeyword = string.Join(",",model.MetaKeyword),
                            PageTitle = model.PageTitle,
                            Title = model.Title,
                            Url = model.Url,
                            Abstract = model.Abstract,
                            ImageId = model.ImageId,
                            Description = model.Description,
                            Visit = model.Visit,
                            ShowInHome = model.ShowInHome,
                            BlogCategoryId = model.BlogCategoryId,

                        });
                    }
                    else
                    {
                        _db.CreateBaseEntity<tbl_Blog>(new tbl_Blog
                        {
                            Abstract = model.Abstract,
                            Description = model.Description,
                            Url = model.Url,
                            Title = model.Title,
                            PageTitle = model.PageTitle,
                            MetaKeyword = string.Join(",", model.MetaKeyword),
                            ImageId = model.ImageId,
                            MetaDescription = model.MetaDescription,
                            BlogCategoryId = model.BlogCategoryId,
                            ShowInHome = model.ShowInHome,
                            Visit = 0,

                        });
                    }
                    await _db.SaveChangesAsync();
                    return new ListResultViewModel<bool>
                    {
                        model = true,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<bool>
                {
                    model = false,
                    Message = "محتوای آدرس تکراری می باشد",
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
    }
}
