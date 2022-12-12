
using ALO.DomainClasses.Entity.Blog;
using ALO.ViewModels.Blog;
using ALO.ViewModels.BlogCategory;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Blog
{
    public interface IBlogCategoryService: IRepositoryService<tbl_BlogCategory>
    {
        Task<ListResultViewModel<IEnumerable<GetBlogCategoryListForAdminDTO>>> GetBlogCategoryForAdmin();
        Task<ListResultViewModel<bool>> AddUpdateblogCategoryForAdmin(AddblogCategoryForAdminDTO model);
        Task<ListResultViewModel<AddblogCategoryForAdminDTO>> GetblogCategoryForEditAdmin(long Id);

    }
}
