using ALO.DomainClasses.Entity.Account;
using ALO.ViewModels.Account;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Account
{
    public interface IUserService
    {
        Task<bool> CheckUser(string mobile);
        Task<ListResultViewModel<tbl_Users>> RegisterAsync(RegisterViewModel model);
        Task<ListResultViewModel<tbl_Users>> Authenticate(string username,string password);
        Task<ListResultViewModel<IEnumerable<tbl_Users>>> GetAll();
        Task<ListResultViewModel<string>> GenerateCodeAsync(string Mobile);
        Task<ListResultViewModel<bool>> CheckCode(string Mobile, string Code);
        Task<ResultViewModel> RemoveMobileCodeAsync(string Mobile);
        Task<ListResultViewModel<tbl_Users>> GetUserAsync(string Mobile);
    }
}
