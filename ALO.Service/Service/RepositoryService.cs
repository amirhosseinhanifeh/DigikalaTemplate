using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses;
using ALO.Service.Interface;
using ALO.ViewModels;
using ALO.ViewModels.Result;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace ALO.Service.Service
{
    public class RepositoryService<T> where T : BaseEntity
    {
        private readonly ServiceContext _db;
        private readonly IMapper _mapper;
        public RepositoryService(ServiceContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public async Task<ListResultViewModel<IEnumerable<DropDownListDTO>>> GetDropDownSelect()
        {
            try
            {
                var result = (await _db.GetAllAsync<T>().ToListAsync())
                    .Select(y => new DropDownListDTO
                    {
                        Id = y.Id.ToString(),
                        Value = y.GetType().GetProperty("Title").GetValue(y,null).ToString()
                    }).ToList();

                return new ListResultViewModel<IEnumerable<DropDownListDTO>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<DropDownListDTO>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
        public async Task<ListResultViewModel<bool>> CreateUpdate<TDES>(TDES model) where TDES : class
        {
            try
            {

                var ss = _mapper.Map<T>(model);
                _db.CreateBaseEntity<T>(ss);
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
        public async Task<ListResultViewModel<bool>> Delete(long Id)
        {
            try
            {

                var result = (await _db.GetAsync<T>(x => x.Id == Id));
                _db.SoftDeletedBaseEntity(result);
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
        public async Task<ListResultViewModel<TDES>> Get<TDES>(long Id)
        {
            try
            {
                var result = (await _db.GetAsync<T>(x => x.Id == Id));
                var ss = _mapper.Map<TDES>(result);
                return new ListResultViewModel<TDES>
                {
                    model = ss,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<TDES>
                {
                    Message = FailMessage,
                    model = default(TDES),
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
    }
}
