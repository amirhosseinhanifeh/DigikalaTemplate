using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ghaleb.Web.Pages.Profile
{
    [Authorize]
    public class DiscountModel : PageModel
    {
        public void OnGet()
        {
        }
    }
}
