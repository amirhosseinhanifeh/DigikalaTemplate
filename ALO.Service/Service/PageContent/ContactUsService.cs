using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
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
    public class ContactUsService : IContactUsService
    {
        private readonly ServiceContext _db;

        public ContactUsService(ServiceContext db)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<ContactUsDetailsDTO>> Get()
        {
            try
            {
                var result = (await _db.GetAsync<tbl_ContactUsDetails>());
                if (result == null)
                {
                    return new ListResultViewModel<ContactUsDetailsDTO>
                    {
                        model = null,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                var query = new ContactUsDetailsDTO()
                {
                    Address=result.Address,
                    Lat=result.Lat,
                    Lng=result.Lng,
                    Mobile=result.Mobile.toPersianNumber(),
                    Phone=result.Phone.toPersianNumber(),
                    Tel=result.Tel,
                    Email=result.Email,
                    Google=result.GoogleMapFrame
                };
                return new ListResultViewModel<ContactUsDetailsDTO>
                {
                    model = query,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<ContactUsDetailsDTO>
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
