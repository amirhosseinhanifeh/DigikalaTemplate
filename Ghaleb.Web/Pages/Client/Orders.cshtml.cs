using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Client
{
    [Authorize]
    public class OrdersModel : PageModel
    {
        private readonly ServiceContext _context;

        public OrdersModel(ServiceContext context)
        {
            _context = context;
        }
        public List<tbl_Order> Order { get; set; }
        public async Task OnGet(long? Id)
        {
            Order = await _context.tbl_Orders
                .Include(x=>x.OrderStateHistories)
                .Include(x => x.OrderDetails)
                .ThenInclude(x => x.ProductPriceHistory)
                .ThenInclude(x=>x.Product)
                .Where(x=>x.UserId==User.UserId()).ToListAsync();
        }
    }
}
