using ALO.ViewModels.ProductComment;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Product
{
    public interface IProductCommentService
    {
        Task<ListResultViewModel<IEnumerable<ProductCommentForWebsiteDto>>> GetProductCommentList(long id);
        Task<ListResultViewModel<bool>> CreateProductComment(RequestProductCommentDto request);
    }
}
