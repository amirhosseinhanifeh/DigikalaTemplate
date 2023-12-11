using Microsoft.AspNetCore.Mvc;

namespace Ghaleb.Web.Pages.ViewComponents.Address
{
    public class AddressViewComponent : ViewComponent
    {


        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View();
        }
    }
}
