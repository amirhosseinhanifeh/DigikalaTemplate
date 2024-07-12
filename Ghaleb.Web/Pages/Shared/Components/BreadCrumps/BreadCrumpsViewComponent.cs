using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using Microsoft.AspNetCore.Mvc;

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
