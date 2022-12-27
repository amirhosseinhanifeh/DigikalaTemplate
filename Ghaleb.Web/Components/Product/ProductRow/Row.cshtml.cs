using ALO.ViewModels.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Ghaleb.Web.Components.Product.ProductRow
{
    public class RowModel : PageModel
    {

        public IEnumerable<CategoryListForHomeDTO> Data { get; set; }
        public async Task<ViewComponentResult> OnGetAsync(int maxPriority = 2, bool isDone = false)
        {
            return ViewComponent("PriorityList",
    new
    {
        maxPriority = maxPriority,
        isDone = isDone
    });
        }
    }
}
