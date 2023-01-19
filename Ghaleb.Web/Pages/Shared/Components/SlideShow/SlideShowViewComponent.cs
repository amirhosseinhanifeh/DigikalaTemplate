using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.ViewComponents.SlideShow
{
    public class SlideShowViewComponent : ViewComponent
    {
        private readonly ServiceContext _context;
        public SlideShowViewComponent(ServiceContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var slideShows = await _context.tbl_SlideShows.Include(x => x.Image).Where(h => h.IsActive && h.IsDelete != true).OrderByDescending(x => x.Id).Take(4).ToListAsync();
            return View(slideShows);
        }
    }
}
