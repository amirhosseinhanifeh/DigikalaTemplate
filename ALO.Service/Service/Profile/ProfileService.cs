using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.PFL;
using ALO.Service.Interface.Profile;
using ALO.ViewModels.Account;
using ALO.ViewModels.Profile;
using ALO.ViewModels.Result;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.Profile
{
    public class ProfileService : IProfileService
    {
        private readonly ServiceContext _db;

        public ProfileService(ServiceContext db)
        {
            _db = db;
        }

        public async Task<ResultViewModel> CreateAsync(long Id, RegisterViewModel model)
        {
            try
            {
                var pro = await _db.tbl_Profile.FindAsync(Id);
                if (pro == null)
                {
                    _db.Create(new tbl_Profile
                    {
                        Id = Id,
                        Gender = Gender.Male,
                        FirstName = model.FirstName,
                        LastName = model.LastName,


                    });
                    await _db.SaveChangesAsync();
                    return new ResultViewModel
                    {
                        Status = Status.Success,
                        NotificationType = NotificationType.success,
                        Message = SuccessfullMessage
                    };
                }
                else
                {
                    pro.FirstName = model.FirstName;
                    pro.LastName = model.LastName;
                    _db.Update(pro);
                    await _db.SaveChangesAsync();
                    return new ResultViewModel
                    {
                        Status = Status.Success,
                        NotificationType = NotificationType.success,
                        Message = SuccessfullMessage
                    };
                }
            }
            catch (Exception e)
            {
                return new ResultViewModel
                {
                    Status = Status.Failed,
                    NotificationType = NotificationType.error,
                    Message = FailMessage
                };
            }
        }

        public async Task<ListResultViewModel<GetUserProfileDetailDTO>> GetAsync(long Id)
        {
            try
            {
                var pro = await _db.tbl_Profile.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == Id);
                if (pro != null)
                {
                    return new ListResultViewModel<GetUserProfileDetailDTO>
                    {
                        model = new GetUserProfileDetailDTO {FirstName=pro.FirstName,LastName=pro.LastName,Mobile=pro.User.Mobile },
                        Status = Status.Success,
                        NotificationType = NotificationType.success,
                        Message = SuccessfullMessage
                    };
                }
                return new ListResultViewModel<GetUserProfileDetailDTO>
                {
                    Status = Status.Failed,
                    NotificationType = NotificationType.error,
                    Message = NotFoundMessage
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<GetUserProfileDetailDTO>
                {
                    Status = Status.Failed,
                    NotificationType = NotificationType.error,
                    Message = FailMessage
                };
            }
        }

        public async Task<ResultViewModel> UpdateAsync(long Id, RequestForUpdateProfileDTO model)
        {
            try
            {
                var user = await _db.tbl_Users.FindAsync(Id);
                user.Mobile = model.Mobile;
                _db.Update(user);
                await _db.SaveChangesAsync();

                var pro = await _db.tbl_Profile.FindAsync(Id);
                pro.FirstName = model.FirstName;
                pro.LastName = model.LastName;
                
                _db.Update(pro);
                await _db.SaveChangesAsync();

                return new ResultViewModel
                {
                    Status = Status.Success,
                    NotificationType = NotificationType.success,
                    Message = SuccessfullMessage
                };

            }
            catch (Exception e)
            {
                return new ResultViewModel
                {
                    Status = Status.Failed,
                    NotificationType = NotificationType.error,
                    Message = FailMessage
                };
            }
        }
    }
}
