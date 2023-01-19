using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.Seo
{
    public class SeoViewComponent : ViewComponent
    {

        public IViewComponentResult Invoke(SeoDTO model, bool doIndex = false)
        {
            model.DoIndex = doIndex;
            return View(model);
        }
    }
    public class SeoDTO
    {
        public string? PageTitle { get; set; }
        public string? MetaDescription { get; set; }
        public string? MetaKeyword { get; set; }
        public bool DoIndex { get; set; }
    }
}
