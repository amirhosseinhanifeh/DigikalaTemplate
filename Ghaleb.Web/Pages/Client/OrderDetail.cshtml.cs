using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Client
{
    public class OrderDetailModel : PageModel
    {
        private readonly ServiceContext _context;

        public OrderDetailModel(ServiceContext context)
        {
            _context = context;
        }

        public tbl_Order Order { get; set; }
        public async Task OnGet(long? Id)
        {
                var result = await _context.tbl_Orders
                .Include(x=>x.OrderStateHistories)
                    .Include(x => x.OrderDetails)
                    .ThenInclude(x => x.ProductPriceHistory)
                    .ThenInclude(x => x.Product)
                    .Include(x => x.UserAddress)
                    .ThenInclude(x => x.User)
                    .ThenInclude(x => x.Profile)
                    .FirstOrDefaultAsync(x => x.Id == Id);
            Order = result;
            
        }
    }
}
