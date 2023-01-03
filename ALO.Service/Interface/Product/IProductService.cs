using ALO.ViewModels.Product.Admin;
using ALO.ViewModels.Product;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ALO.Common.Enums;
using Microsoft.AspNetCore.Http;
using ALO.DomainClasses.Entity.Product;

namespace ALO.Service.Interface.Product
{
    public interface IProductService
    {
        ListResultViewModel<IQueryable<ProductListForHomeDto>> GetProductList(
            long? maincategoryId = null,
                        long? categoryId = null,
                        long? subcategoryId = null,
            long[] categoryIds = null,
            long[]? brandIds = null,
            long? tagId = null,
            long[] optionIds = null,
            string title = null,
            string order = null,
            int page = 1,
            int pageSize = 10,
            long? ownerId = null,
            bool? isExists = null);
        Task<ListResultViewModel<IEnumerable<ProductListForHomeDto>>> GetLastVisitProductList(long userId);
        Task<ListResultViewModel<IEnumerable<object>>> GetLastVisitCategoryList(long userId);
        Task<ListResultViewModel<IEnumerable<CategoryListForHomeDTO>>> GetHomeProductsByCategoryList();
        Task<ListResultViewModel<ProductDetailsForHomeDto>> GetProductDetails(long url, long? UserId = null);
        ListResultViewModel<IQueryable<GetProductListForAdminDto>> GetProductListForAdmin(long? brandId, long? subcategoryId, int page = 1, int pageSize = 6);
        Task<ListResultViewModel<bool>> AddProductForAdmin(AddProductForAdminDTO model);
        Task<ListResultViewModel<AddProductForAdminDTO>> GetProductForAdmin(long Id);
        Task<ListResultViewModel<bool>> UpdateProductForAdmin(AddProductForAdminDTO model);
        ListResultViewModel<bool> Delete(long Id);
        Task UpdateImage(long id, long ImageId);
        Task<long> Create(RequestCreateProductDTO model, long? userId);
        Task<tbl_Product> Find(long id);
        Task<bool> AddToFavorite(long id, long userId);
        Task<bool> AddProductVisit(long id, long userId);
        Task<object> GetChartData(string id);
        Task<ListResultViewModel<object>> Search(string name);
    }
}
