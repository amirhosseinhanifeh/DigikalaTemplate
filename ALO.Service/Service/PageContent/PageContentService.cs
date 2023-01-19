using ALO.Common.Enums;
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
    public class PageContentService : IPageContentService
    {
        private readonly ServiceContext _db;

        public PageContentService(ServiceContext db)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<PageContentDTO>> Get(string url)
        {
            try
            {
                var result = (await _db.GetAsync<tbl_PageContent>(x => x.Url == url));
                   var query = new PageContentDTO()
                    {
                        Title =result.Title,
                        Description= result.Description,
                        MetaDescription= result.MetaDescription,
                        PageTitle= result.PageTitle,
                        Url = result.Url

                    };
                return new ListResultViewModel<PageContentDTO>
                {
                    model = query,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<PageContentDTO>
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
