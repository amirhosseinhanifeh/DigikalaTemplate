using ALO.DomainClasses.Entity.Financial;
using ALO.ViewModels.Financial;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.FinancialAccount
{
    public interface IFinancialService
    {
        Task<ListResultViewModel<string>> CreateAsync(long UserId, decimal debtor, string Description = "");
        Task<ListResultViewModel<string>> PaymentAsync(long UserId, decimal creditor, string Description = "");
        Task<ListResultViewModel<IEnumerable<FinancialAccountViewModel>>> ListAsync(long UserId);
    }
}
