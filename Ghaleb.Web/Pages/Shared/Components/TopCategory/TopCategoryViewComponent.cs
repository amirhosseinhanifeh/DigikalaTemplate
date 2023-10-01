using ALO.DataAccessLayer.DataContext;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.ViewComponents.TopCategory
{
    public class TopCategoryViewComponent : ViewComponent
    {
        private readonly IProductCategoryService _productCategory;
        private readonly ServiceContext _context;
        public TopCategoryViewComponent(IProductCategoryService productCategory, ServiceContext context)
        {
            _productCategory = productCategory;
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var result = await _context.tbl_MainProductCategory.Include(x=>x.Logo).ToListAsync();

            return View(result);
        }
    }
}
