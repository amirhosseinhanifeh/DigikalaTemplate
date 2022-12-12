using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.Service.Interface;
using ALO.Service.Interface.Blog;
using ALO.ViewModels.Blog;
using ALO.ViewModels.BlogCategory;
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
    public class BlogCategoryService :RepositoryService<tbl_BlogCategory>, IBlogCategoryService
    {
        private readonly ServiceContext _db;
        private readonly IMapper _mapper;

        public BlogCategoryService(ServiceContext db,IMapper mapper) :base(db,mapper)
        {
            _db = db;
        }

        public async Task<ListResultViewModel<bool>> AddUpdateblogCategoryForAdmin(AddblogCategoryForAdminDTO model)
        {
            try
            {

                if (!_db.tbl_BlogCategories.Any(y => y.Url == model.Url && y.IsDelete != true))
                {
                    if (model.Id != null)
                    {

                        _db.UpdateBaseEntity<tbl_BlogCategory>(new tbl_BlogCategory
                        {
                            Id=model.Id.Value,
                            MetaDescription=model.MetaDescription,
                            MetaKeyword=model.MetaKeyword,
                            PageTitle=model.PageTitle,
                            Title=model.Title,
                            Url=model.Url,
                            
                        });
                    }
                    else {
                        _db.CreateBaseEntity<tbl_BlogCategory>(new tbl_BlogCategory
                        {

                            Url = model.Url,
                            Title = model.Title,
                            PageTitle = model.PageTitle,
                            MetaKeyword = model.MetaKeyword,
                            MetaDescription = model.MetaDescription,
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




        public async Task<ListResultViewModel<IEnumerable<GetBlogCategoryListForAdminDTO>>> GetBlogCategoryForAdmin()
        {
            try
            {

                var result = (await _db.GetAllAsync<tbl_BlogCategory>().ToListAsync())
                    .Select(x => new GetBlogCategoryListForAdminDTO
                    {
                        Id=x.Id,
                        MetaDescription=x.MetaDescription,
                        MetaKeyword=x.MetaKeyword,
                        PageTitle=x.PageTitle,
                        Title=x.Title,
                        Url=x.Url
                    }).ToList();
                return new ListResultViewModel<IEnumerable<GetBlogCategoryListForAdminDTO>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<GetBlogCategoryListForAdminDTO>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public Task<ListResultViewModel<AddblogCategoryForAdminDTO>> GetblogCategoryForEditAdmin(long Id)
        {
            throw new NotImplementedException();
        }

        public Task<ListResultViewModel<AddblogCategoryForAdminDTO>> UpdateblogCategoryForAdmin(long Id)
        {
            throw new NotImplementedException();
        }

    }
}
