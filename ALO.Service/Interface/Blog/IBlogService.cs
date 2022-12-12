using ALO.DomainClasses.Entity.Blog;
using ALO.ViewModels.Blog;
using ALO.ViewModels.Blog.Admin;
using ALO.ViewModels.Result;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Blog
{
    public interface IBlogService : IRepositoryService<tbl_Blog>
    {
        Task<ListResultViewModel<IEnumerable<BlogListForWebsiteDTO>>> GetBlogsForWebsite(string category = null);
        Task<ListResultViewModel<BlogDetailsForHomeDto>> GetBlogDetails(string url);
        Task<ListResultViewModel<IEnumerable<BlogListForAdminDTO>>> GetBlogListForAdmin();
        Task<ListResultViewModel<bool>> CreateUpdate(RequestBlogDTO model);
    }
}
