using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Forms;
using ALO.Service.Interface.Forms;
using ALO.ViewModels.Forms;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;
namespace ALO.Service.Service.Forms
{
    public class FormContactUsService : IFormContactUsService
    {
        private readonly ServiceContext _db;

        public FormContactUsService(ServiceContext db)
        {
            _db = db;
        }
        public async Task<ListResultViewModel<bool>> CreateAsync(FormContactUsDTO model)
        {
            try
            {
                    tbl_FormContantUs data = new tbl_FormContantUs()
                    {
                        Body=model.Body,
                        Email=model.Email,
                        FullName=model.FullName,
                        Mobile=model.Mobile,
                        
                    };
                    _db.Create(data);
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
    }
}
