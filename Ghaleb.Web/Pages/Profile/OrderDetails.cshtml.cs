using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ZarinPal.Class;

namespace Ghaleb.Web.Pages.Profile
{
    public class OrderDetailsModel : PageModel
    {
        private readonly ServiceContext _context;

        public OrderDetailsModel(ServiceContext context)
        {
            _context = context;
        }
        public tbl_Order Order { get; set; }
        public async Task OnGet(long Id)
        {
            Order = await _context.tbl_Orders.Include(x => x.OrderStateHistories)
                .Include(x=>x.UserAddress)
                .Include(x => x.DeliveryPrice)
                .Include(x=>x.OrderDetails)
                .ThenInclude(x=>x.ProductPriceHistory)
                .ThenInclude(x=>x.Product)
                .FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}
