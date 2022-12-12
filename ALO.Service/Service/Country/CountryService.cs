using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Country;
using ALO.Service.Interface.Country;
using ALO.ViewModels.Result;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Service.Country
{
    public class CountryService : ICountryService
    {
        private readonly ServiceContext _db;
        private readonly IMapper _mapper;

        public CountryService(ServiceContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        public async Task<ResultViewModel> CreateAsync(tbl_Country model)
        {
            throw new NotImplementedException();
        }
    }
}
