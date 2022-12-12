using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.Service.Interface.PageContent;
using ALO.ViewModels.PageContent;
using ALO.ViewModels.Result;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.PageContent
{
    public class SocialNetworkService : ISocialNetworkService
    {
        private readonly ServiceContext _db;

        public SocialNetworkService(ServiceContext db)
        {
            _db = db;
        }

        public async Task<ListResultViewModel<GetInfoTopHeaderForWebsiteDTO>> Get()
        {
            try
            {
                var contact =await _db.GetAsync<tbl_ContactUsDetails>();
                var result = (await _db.GetAllAsync<tbl_SocialNetworks>().ToListAsync());

                var data= new GetInfoTopHeaderForWebsiteDTO()
                {
                    Email=contact.Email,
                    Tel=contact.Phone,
                    socials= result.Select(y=>new GetSocialNetworkForWebsiteDTO
                    {
                        Url = y.Url,
                        Social = y.Social.ToString(),
                        Icon=y.Icon
                    }).ToList()


                };
                return new ListResultViewModel<GetInfoTopHeaderForWebsiteDTO>
                {
                    model = data,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<GetInfoTopHeaderForWebsiteDTO>
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
