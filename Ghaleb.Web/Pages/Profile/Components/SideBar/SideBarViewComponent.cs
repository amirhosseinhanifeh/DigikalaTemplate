using ALO.DataAccessLayer.DataContext;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.ViewComponents.TopCategory
{
    public class SideBarViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        public SideBarViewComponent( ServiceContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {


            return View();
        }
    }
}
