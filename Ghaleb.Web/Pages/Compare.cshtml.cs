using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class CompareModel : PageModel
    {
        private readonly ServiceContext _context;

        public CompareModel(ServiceContext context)
        {
            _context = context;
        }
        public List<tbl_Product> Products { get; set; }
        public List<tbl_ProductCustomFields> CustomFields { get; set; }
        public string Title { get; set; }
        public async Task OnGet(long pr1, long? pr2, long? pr3, long? pr4)
        {
            var cat = await _context.tbl_Products.FirstOrDefaultAsync(x => x.Id == pr1);
            CustomFields = await _context.tbl_ProductCustomFields.Where(x => x.ProductCategoryId == cat.ProductCategoryId || x.SubProductCategoryId == cat.SubProductCategoryId).ToListAsync();
            Products = await _context.tbl_Products.Include(x => x.Image).Include(x => x.ProductCustomFieldValues).ThenInclude(x => x.ProductCustomField).Where(x => x.Id == pr1 || x.Id == pr2 || x.Id == pr3 || x.Id == pr4).ToListAsync();
            Products.ForEach(res =>
            {
                Title += res.Title+" و ";
            });
        }
    }
}
