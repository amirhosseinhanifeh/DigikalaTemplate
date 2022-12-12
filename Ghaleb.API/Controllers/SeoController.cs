using ALO.Common.Enums;
using ALO.Service.Interface.PageContent;
using ALO.ViewModels.PageContent;
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
    public class SeoController : ControllerBase
    {
        private readonly ISeoService _seoService;

        public SeoController(ISeoService seoService)
        {
            _seoService = seoService;
        }
        [HttpGet]
        public async Task<ActionResult<GetHomePageSeoDTO>> GetAsync()
        {
            try
            {
                var result = await _seoService.Get();
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
    }
}
