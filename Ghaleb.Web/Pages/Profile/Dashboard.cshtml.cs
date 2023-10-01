using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Order;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Profile
{
    [Authorize]
    public class DashboardModel : PageModel
    {
        private readonly ServiceContext _context;

		public DashboardModel(ServiceContext context)
		{
			_context = context;
		}
        public List<tbl_UserAddresses> UserAddresses { get; set; }
        public List<tbl_Order> Orders { get; set; }
        public tbl_Users UserInfo { get; set; }
        public async Task OnGet()
        {
            UserInfo = await _context.tbl_Users.Include(x=>x.Profile).FirstOrDefaultAsync(h => h.Id == User.UserId());
            UserAddresses = await _context.tbl_UserAddresses.Where(x => x.UserId == User.UserId() && x.IsDelete==false).OrderByDescending(x=>x.Id).ToListAsync();
            Orders = await _context.tbl_Orders.Include(x=>x.OrderStateHistories).Include(x=>x.DeliveryPrice).Include(x=>x.OrderDetails).ThenInclude(x=>x.ProductPriceHistory).Where(x => x.UserId == User.UserId() && x.OrderStateHistories.Any(h=>h.OrderState==OrderState.PAYED)).OrderByDescending(x=>x.Id).Take(6).ToListAsync();
        }
        
    }
}
