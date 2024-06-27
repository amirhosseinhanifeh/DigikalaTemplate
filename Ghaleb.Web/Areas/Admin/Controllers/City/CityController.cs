using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.City;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.City
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class CityController : Controller
    {
        private readonly ServiceContext _context;
        public CityController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long? countryId = null)
        {
            return View(await _context.GetAllAsync<tbl_City>().Where(x => countryId != null ? x.CountryId == countryId : true).ToListAsync());
        }
    }
}
