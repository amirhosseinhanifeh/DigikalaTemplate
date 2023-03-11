using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Clerk.Controllers.Product
{
    [Authorize(Roles = "Clerk")]

    public class ProductGalleryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
