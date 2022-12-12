using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.Service.Interface.Product;
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
    public class ProductSubCategoryService : IProductSubCategoryService
    {
        private readonly ServiceContext _db;

        public ProductSubCategoryService(ServiceContext db)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<IEnumerable<DropDownListDTO>>> GetSubCategorySelect(long? Id=null)
        {
            try
            {
                var result = (await _db.GetAllAsync<tbl_SubProductCategory>(x=>Id!=null? x.ProductCategoryId==Id:true).ToListAsync())
                    .Select(y => new DropDownListDTO
                    {
                        Id = y.Id.ToString(),
                        Value = y.Title
                    }).ToList();

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
    }
}
