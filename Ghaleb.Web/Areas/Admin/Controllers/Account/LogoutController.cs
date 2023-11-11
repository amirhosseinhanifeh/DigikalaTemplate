using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Account
{
    [Area("Admin")]
    public class LogoutController : Controller
    {
        public async Task<IActionResult> Index()
        {
            await HttpContext.SignOutAsync();
            return Redirect("~/Admin/Login");
        }
    }
}
