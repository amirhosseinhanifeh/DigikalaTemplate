using ALO.DataAccessLayer.DataContext;
using Microsoft.AspNetCore.Mvc;

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
            ViewData["ProductID"] = prId;
            return View();
        }

    }
}
