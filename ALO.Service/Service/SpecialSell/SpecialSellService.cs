using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.SpecialSell;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.SpecialSell;
using ALO.ViewModels.Result;
using ALO.ViewModels.SpecialSell;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.SpecialSell
{
    public class SpecialSellService : ISpecialSellService
    {
        private readonly ServiceContext _db;
        private readonly IConfiguration _configuration;
        public SpecialSellService(ServiceContext db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }
        public async Task<ListResultViewModel<GetSpecialSellForHomeDto>> GetRandomSpecialSell()
        {
            try
            {

                var date = DateTime.Now;
                var result = (await _db.GetAsync<tbl_SpecialSell>(x => x.ToDate > date && x.IsActive == true, new string[] { "SpecialSellProducts", "SpecialSellProducts.Product", "SpecialSellProducts.Product.Image" }));

                var product = result.SpecialSellProducts.Select(x => new GetSpecialSellForHomeDto
                {
                    SpecialTitle = result.Title,
                    EndDate = result.ToDate,
                    EndDatePersian = "",
                    Image = x.Product.Image.BindImage(_configuration),
                    OffPrice = "12,000",
                    Url = x.Product.Url,
                    Title = x.Product.Title

                }).ToList();
                var rnd = new Random();
                if (product.Any())
                {
                    return new ListResultViewModel<GetSpecialSellForHomeDto>
                    {
                        model = product.OrderBy(x => rnd.Next()).FirstOrDefault(),
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<GetSpecialSellForHomeDto>
                {
                    model = null,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<GetSpecialSellForHomeDto>
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
