using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Ghaleb.Web.Helpers;

namespace Ghaleb.Web.Pages.ViewComponents.Comment
{
    public class CommentViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        public CommentViewComponent(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync(long prId)
        {
            ViewBag.ProductID = prId;
            return View();
        }

    }
}
