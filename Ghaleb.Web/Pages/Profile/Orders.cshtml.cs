using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Profile
{
    [Authorize]
    public class OrdersModel : PageModel
    {
		private readonly ServiceContext _context;

		public OrdersModel(ServiceContext context)
		{
			_context = context;
		}

        public List<tbl_Order> Orders { get; set; }
        public async Task OnGet()
        {
            Orders = await _context.tbl_Orders.Include(x=>x.OrderStateHistories).Include(x=>x.OrderDetails).ThenInclude(x=>x.ProductPriceHistory).Include(x=>x.DeliveryPrice).Where(x => x.UserId == User.UserId()).ToListAsync();
        }
    }
}
