using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ghaleb.Web.Pages.ViewComponents.Comment
{
    public class DefaultModel : PageModel
    {

        public void OnGet()
        {
        }
        public async Task<IActionResult> OnPostAsync()
        {
            return Redirect("~/");
        }
    }
}
