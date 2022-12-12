using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ServiceContext _context;

        public OrderController(ServiceContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.UserId();
            return Ok((await _context.tbl_Orders
                .Include(x=>x.OrderDetails)
                .ThenInclude(x=>x.ProductPriceHistory)
                .Include(x=>x.UserAddress)
                .ThenInclude(x=>x.User)
                .ThenInclude(x=>x.Profile)
                .Where(x=>x.UserId==userId)
                .ToListAsync())
                .Select(h=>new
                {
                    Id=h.Id,
                    OrderCode=h.OrderCode,
                    OrderState=h.OrderState,
                    Date =h.CreatedDate,
                    UserAddress=new
                    {
                        FirstName=h.UserAddress.User.Profile.FirstName,
                        LastName=h.UserAddress.User.Profile.LastName,
                        Address=h.UserAddress.Address,
                        Phone= h.UserAddress.Phone,
                        Mobile=h.UserAddress.Mobile,

                    },
                    ItemCount = h.OrderDetails.Count(),
                    TotalPrice = h.OrderDetails.Sum(k=>k.ProductPriceHistory.GetPrice() * k.Count).ToString("n0").toPersianNumber()


                }));
        }
    }
}
