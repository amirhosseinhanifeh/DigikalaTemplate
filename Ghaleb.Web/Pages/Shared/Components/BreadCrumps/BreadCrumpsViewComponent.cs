using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.ViewComponents.BreadCrumps
{
    public class BreadCrumpsViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;

        public BreadCrumpsViewComponent(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IViewComponentResult> InvokeAsync(tbl_PageContent model)
        {
            return View(model);
        }
    }
}
