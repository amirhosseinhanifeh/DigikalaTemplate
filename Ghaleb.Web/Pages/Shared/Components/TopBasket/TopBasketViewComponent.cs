using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ghaleb.Web.Pages.ViewComponents.TopBasket
{
    public class TopBasketViewComponent : ViewComponent
    {

        public async Task<IViewComponentResult> InvokeAsync(string routeName)
        {
            var list = Request.Cookies["basket"];
            if (list != null)
            {
                var da = JsonConvert.DeserializeObject<List<object>>(list);
                return View(da.Count());

            }
            return View(0);

        }
    }
}
