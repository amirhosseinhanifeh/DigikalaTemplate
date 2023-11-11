using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Country
{
    [Authorize(Roles = "Admin")]

    public class CountryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
