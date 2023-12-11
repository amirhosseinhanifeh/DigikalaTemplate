using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Country;
using ALO.Service.Interface.Country;
using ALO.ViewModels.Result;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Service.Country
{
    public class CountryService : ICountryService
    {
        private readonly ServiceContext _db;

        public CountryService(ServiceContext db)
        {
            _db = db;
        }
    }
}
