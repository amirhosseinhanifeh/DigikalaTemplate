using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Clerk.Controllers.Account
{
    [Area("Clerk")]
    public class LogoutController : Controller
    {
        public async Task<IActionResult> Index()
        {
            await HttpContext.SignOutAsync();
            return Redirect("~/Clerk/Login");
        }
    }
}
