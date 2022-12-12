using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.Service.Interface.Basket;
using ALO.ViewModels.Basket;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class BasketController : ControllerBase
    {
        private readonly IBasketOrderService _basket;

        public BasketController(IBasketOrderService basket)
        {
            _basket = basket;
        }
        [HttpGet]
        public async Task<ActionResult<GetBasketListForHome>> GetAllAsync()
        {
            try
            {if (User.Identity.IsAuthenticated)
                {
                    var user = User.Identity.Name.Tolong();
                    var result = await _basket.GetAllBaskets(user.Value);
                    return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
                }
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });


            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        [HttpPost]
        public async Task<ActionResult<bool>> CreateAsync([FromBody] RequestBasketForHomeDto request)
        {
            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    var result = await _basket.AddProductToBasket(request.ProductId, User.Identity.Name.Tolong().Value);
                    return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
                }
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });

            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        [HttpPost]
        public async Task<ActionResult<bool>> DeleteAsync([FromQuery] long id)
        {
            try
            {
                var result = await _basket.DeleteProductFromBasket(id);
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
    }
}
