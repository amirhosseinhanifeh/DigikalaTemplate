using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product;
using ALO.ViewModels.Result;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.Product
{
    public class ProductCategoryService : IProductCategoryService
    {
        private readonly ServiceContext _db;

        public ProductCategoryService(ServiceContext db)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<IEnumerable<CategoryForSiteHeaderDto>>> GetCategoryForSiteHeader()
        {
            try
            {
                var data = _db.GetAllAsync<tbl_MainProductCategory>()
                    .Include(x => x.ProductCategories)
                    .ThenInclude(x => x.SubProductCategories);

                var result = data.Select(y => new CategoryForSiteHeaderDto
                {
                    Id=y.Id,
                    Title = y.Name,
                    Url = y.Url,
                    Categories = y.ProductCategories.Select(x => new CategoryForSiteHeader
                    {
                        Id = x.Id,
                        Title = x.Title,
                        Url = x.Url,
                        SubCategoryForSiteHeaders = x.SubProductCategories.Select(h => new SubCategoryForSiteHeader
                        {
                            Id=h.Id,
                            Title = h.Title,
                            Url = h.Url
                        }).ToList()
                    }).ToList()


                }); ;

                return new ListResultViewModel<IEnumerable<CategoryForSiteHeaderDto>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<CategoryForSiteHeaderDto>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<IEnumerable<ProductCustomFields>>> GetFields(long categoryId)
        {
            var data = await _db.tbl_ProductCustomFields.Include(x => x.ProductCustomFieldsOptionValues)
                .Where(x => x.ProductCategoryId == categoryId)
                .Where(x=>x.FieldType==FieldType.DROPDOWN?x.ProductCustomFieldsOptionValues.Any():true)
                .Select(x => new ProductCustomFields
                {
                    Id=x.Id,
                    Name = x.Name.ToString(),
                    Key = x.Key,
                    Value = x.FieldType.ToString(),
                    Options = x.ProductCustomFieldsOptionValues.Select(y => new ProductCustomFields
                    {
                        Key=y.Id.ToString(),
                        Value = y.Value
                    }).ToList()
                }).ToListAsync();
            return new ListResultViewModel<IEnumerable<ProductCustomFields>>
            {
                model = data,
                Message = SuccessfullMessage,
                NotificationType = NotificationType.success,
                Status = Status.Success
            };
        }

        public async Task<ListResultViewModel<IEnumerable<DropDownListDTO>>> GetProductCategoriesSelect(long? mainCategoryId=null)
        {
            try
            {
                var result = await _db.GetAllAsync<tbl_ProductCategory>()
                    .Where(x=>mainCategoryId !=null?x.MainProuctCategoryId==mainCategoryId:true)
                    .Select(y => new DropDownListDTO
                    {
                        Id = y.Id.ToString(),
                        Value = y.Title
                    }).ToListAsync();

                return new ListResultViewModel<IEnumerable<DropDownListDTO>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<DropDownListDTO>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<GetCategoryDetailForWebsiteDTO>> GetProductCategoryForWebsite(string url)
        {
            try
            {
                var result = (await _db.GetAsync<tbl_SubProductCategory>(x => x.Url == url));

                var data = new GetCategoryDetailForWebsiteDTO
                {
                    MetaDescription = result.MetaDescription,
                    MetaKeyword = result.MetaKeyword,
                    PageTitle = result.PageTitle,
                    Title = result.Title,
                    Url = result.Url,


                };

                return new ListResultViewModel<GetCategoryDetailForWebsiteDTO>
                {
                    model = data,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<GetCategoryDetailForWebsiteDTO>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
    }
}
