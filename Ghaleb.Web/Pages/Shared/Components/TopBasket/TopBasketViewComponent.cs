using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
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
