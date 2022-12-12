using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.Service.Interface.Product;
using ALO.ViewModels.ProductComment;
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
    public class ProductCommentService : IProductCommentService
    {
        private readonly ServiceContext _db;

        public ProductCommentService(ServiceContext db)
        {
            _db = db;
        }

        public async Task<ListResultViewModel<bool>> CreateProductComment(RequestProductCommentDto request)
        {
            try
            {
                tbl_ProductComment model = new tbl_ProductComment()
                {
                    Body = request.Body,
                    Email = request.Email,
                    FullName = request.FullName,
                    Mobile = request.Mobile,
                    ProductId = request.ProductId,
                    IP=request.IP,
                    IsActive=false,
                    CreatedDate=DateTime.Now
                };
                _db.Create<tbl_ProductComment>(model);
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

        public async Task<ListResultViewModel<IEnumerable<ProductCommentForWebsiteDto>>> GetProductCommentList(long id)
        {
            try
            {
                var result = (await _db.GetAllAsync<tbl_ProductComment>(x => x.ProductId == id && x.IsActive==true).ToListAsync())
                    .Select(y => new ProductCommentForWebsiteDto
                    {
                        Body = y.Body,
                        FullName = y.FullName,
                        Response = y.Response
                    }).ToList();
                return new ListResultViewModel<IEnumerable<ProductCommentForWebsiteDto>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<ProductCommentForWebsiteDto>>
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
