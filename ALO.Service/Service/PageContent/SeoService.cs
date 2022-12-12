using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.PageContent;
using ALO.ViewModels.PageContent;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.PageContent
{
    public class SeoService : ISeoService
    {
        private readonly ServiceContext _db;

        public SeoService(ServiceContext db)
        {
            _db = db;
        }

        public async Task<ListResultViewModel<GetHomePageSeoDTO>> Get()
        {
            try
            {
                var data =await _db.GetAsync<tbl_Seo>(includes:new string[] { "FavIcon" });
                if(data ==null)
                {
                    return new ListResultViewModel<GetHomePageSeoDTO>
                    {
                        model = null,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                var result = new GetHomePageSeoDTO()
                {
                    PageTitle=data.PageTitle,
                    Address=data.Address,
                    FavIcon=data.FavIcon.BindImage(),
                    Lat=data.Lat,
                    Lng=data.Lng,
                    MetaDescription=data.MetaDescription,
                    MetaKeyword=data.MetaKeyword,
                    Phone=data.Phone,
                    PostalCode=data.PostalCode,
                };
                return new ListResultViewModel<GetHomePageSeoDTO>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception)
            {

                return new ListResultViewModel<GetHomePageSeoDTO>
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
