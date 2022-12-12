using ALO.Common.Enums;
using ALO.Service.Interface.SpecialSell;
using ALO.ViewModels.SpecialSell;
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
    public class SpecialSellController : ControllerBase
    {
        private readonly ISpecialSellService _sell;

        public SpecialSellController(ISpecialSellService sell)
        {
            _sell = sell
                ;
        }
        [HttpGet]
        public async Task<ActionResult<GetSpecialSellForHomeDto>> GetAsync()
        {
            try
            {
                var result = await _sell.GetRandomSpecialSell();
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
    }
}
