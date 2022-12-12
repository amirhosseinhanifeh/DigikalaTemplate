using ALO.Common.Enums;
using ALO.Common.Utilities.Generate;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.Service.Interface.Account;
using ALO.ViewModels.Account;
using ALO.ViewModels.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.Account
{
    public class UserService : IUserService
    {
        private readonly ServiceContext _db;
        private readonly IMapper _mapper;
        public UserService(IMapper mapper, ServiceContext db)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ListResultViewModel<tbl_Users>> Authenticate(string username,string password)
        {
            try
            {
                var data = await _db.GetAsync<tbl_Users>(x => x.Email == username && x.Password==password, new[] { "Profile", "tbl_UserInRole", "tbl_UserInRole.Role" });
                if (data != null)
                {
                    return new ListResultViewModel<tbl_Users>
                    {
                        Message = SuccessfullMessage,
                        model = data,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<tbl_Users>
                {
                    Message = FailLoginMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<tbl_Users>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed

                };
            }
        }

        public async Task<ListResultViewModel<bool>> CheckCode(string Mobile, string Code)
        {
            try
            {
                var data = await _db.tbl_PhoneVerification.FirstOrDefaultAsync(x => x.Mobile == Mobile && x.VerificationCode == Code);
                if (data != null)
                {
                    return new ListResultViewModel<bool>
                    {
                        Message = SuccessfullMessage,
                        model = true,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<bool>
                {
                    Message = FailLoginMessage,
                    model = false,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
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

        public async Task<bool> CheckUser(string mobile)
        {
            var user = await _db.GetAsync<tbl_Users>(x => x.Email == mobile);
            if (user != null)
            {
                return true;
            }
            return false;
        }

        public async Task<ListResultViewModel<string>> GenerateCodeAsync(string Mobile)
        {
            try
            {
                var data = await _db.tbl_PhoneVerification.FindAsync(Mobile);
                if (data == null)
                {
                    string Code = Generate.GenerateCode();
                    _db.Create(new tbl_PhoneVerification
                    {
                        Mobile = Mobile,
                        VerificationCode = Code

                    });
                    await _db.SaveChangesAsync();
                    return new ListResultViewModel<string>
                    {
                        Message = SuccessfullMessage,
                        model = Code,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<string>
                {
                    Message = FailLoginMessage,
                    model = data.VerificationCode,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<string>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed

                };
            }
        }

        public async Task<ListResultViewModel<IEnumerable<tbl_Users>>> GetAll()
        {
            try
            {
                var data = await _db.GetAllAsync<tbl_Users>(x => x.IsActive == true, new string[] { "Profile", "tbl_UserInRole", "tbl_UserInRole.Role", "Reservations" }).ToListAsync();

                return new ListResultViewModel<IEnumerable<tbl_Users>>
                {
                    Message = SuccessfullMessage,
                    model = data,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<tbl_Users>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<tbl_Users>> GetUserAsync(string Mobile)
        {
            try
            {
                var user = await _db.GetAsync<tbl_Users>(x => x.Mobile == Mobile);
                return new ListResultViewModel<tbl_Users>
                {
                    model = user,
                    Status = Status.Success,
                    NotificationType = NotificationType.success,
                    Message = SuccessfullMessage
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<tbl_Users>
                {
                    model = null,
                    Status = Status.Failed,
                    NotificationType = NotificationType.error,
                    Message = FailMessage
                };
            }
        }

        public async Task<ListResultViewModel<tbl_Users>> RegisterAsync(RegisterViewModel model)
        {
            try
            {
                if (!await CheckUser(model.Email))
                {
                    var role = await _db.GetAsync<tbl_Role>(x => x.RoleName == "User");
                    tbl_Users user = new tbl_Users()
                    {
                        Email = model.Email,
                        Mobile=model.Mobile,
                        IP = "",
                        Password=model.Password,
                        Registeredby=model.Registeredby,
                        
                    };
                    user.tbl_UserInRole = new List<tbl_UserInRole>();
                    user.tbl_UserInRole.Add(new tbl_UserInRole
                    {
                        Role = role,
                        User = user

                    });
                    _db.tbl_Users.Attach(user);
                    _db.Create(user);
                    await _db.SaveChangesAsync();

                    return new ListResultViewModel<tbl_Users>
                    {
                        model = user,
                        Status = Status.Success,
                        NotificationType = NotificationType.success,
                        Message = SuccessfullMessage
                    };
                }
                else
                {
                    return new ListResultViewModel<tbl_Users>
                    {
                        model = await _db.GetAsync<tbl_Users>(x=>x.Email==model.Email),
                        Status = Status.Failed,
                        NotificationType = NotificationType.warning,
                        Message = ExistMessage
                    };
                }
               
            }
            catch (Exception e)
            {
                return new ListResultViewModel<tbl_Users>
                {
                    model = null,
                    Status = Status.Failed,
                    NotificationType = NotificationType.error,
                    Message = FailMessage
                };
            }
        }

        public async Task<ResultViewModel> RemoveMobileCodeAsync(string Mobile)
        {
            try
            {
                _db.Remove(await _db.tbl_PhoneVerification.FindAsync(Mobile));
                await _db.SaveChangesAsync();
                return new ResultViewModel
                {
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ResultViewModel
                {
                    Message = FailMessage,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
    }
}
