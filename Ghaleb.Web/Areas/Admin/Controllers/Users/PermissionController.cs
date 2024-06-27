using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.API.Areas.Admin.Controllers.Users
{
    [Authorize(Roles = "Admin")]
    public class PermissionController : Controller
    {
        private readonly ServiceContext _serviceContext;

        public PermissionController(ServiceContext serviceContext)
        {
            _serviceContext = serviceContext;
        }

        public async Task<IActionResult> Index()
        {

            return View(await _serviceContext.tbl_Permissions.AsNoTracking().ToListAsync());
        }
    }
}
