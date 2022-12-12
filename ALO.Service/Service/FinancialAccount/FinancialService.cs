using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Financial;
using ALO.Service.Interface.FinancialAccount;
using ALO.ViewModels.Financial;
using ALO.ViewModels.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service.FinancialAccount
{
    public class FinancialService : IFinancialService
    {
        private readonly ServiceContext _db;
        private readonly IMapper _mapper;

        public FinancialService(ServiceContext db,IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ListResultViewModel<string>> CreateAsync(long UserId,decimal debtor, string Description = "")
        {
            try
            {
                var financial = await _db.GetAllAsync<tbl_FinancialAccount>(x => x.UserId == UserId).ToListAsync();
                decimal TotalAmount = financial.Count() > 0 ? financial.OrderBy(x => x.CreatedDate).LastOrDefault().AccountBalance -  debtor : 0-debtor;
                _db.Create(new tbl_FinancialAccount
                {

                    AccountBalance =TotalAmount,
                    Description = Description,
                    UserId = UserId,
                    Debtor = debtor,
                    Creditor = 0,

                });
                await _db.SaveChangesAsync();
                return new ListResultViewModel<string>
                {
                    model = "",
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<string>
                {
                    Message = FailMessage,
                    model = "",
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<IEnumerable<FinancialAccountViewModel>>> ListAsync(long UserId)
        {
            try
            {
                var result = await _db.GetAllAsync<tbl_FinancialAccount>(x => x.UserId == UserId).ToListAsync();
                return new ListResultViewModel<IEnumerable<FinancialAccountViewModel>>
                {
                    model = _mapper.Map<IEnumerable<FinancialAccountViewModel>>(result),
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<FinancialAccountViewModel>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<string>> PaymentAsync(long UserId, decimal creator, string Description = "")
        {
            try
            {
                var financial = await _db.GetAllAsync<tbl_FinancialAccount>(x => x.UserId == UserId).ToListAsync();
                decimal TotalAmount = financial.Count() > 0 ? financial.OrderBy(x => x.CreatedDate).LastOrDefault().AccountBalance + creator : creator;
                var amount = new tbl_FinancialAccount
                {

                    AccountBalance = TotalAmount,
                    Description = Description,
                    UserId = UserId,
                    Debtor = 0,
                    Creditor = creator,

                };
                _db.Create(amount);
                _db.SaveChanges();
                return new ListResultViewModel<string>
                {
                    model = "",
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
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
    }
}
