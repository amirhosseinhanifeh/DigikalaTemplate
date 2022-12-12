using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ALO.Common.Utilities.ConvertTo;
using ALO.DomainClasses.Entity.Financial;
using ALO.Service.Interface.FinancialAccount;
using ALO.ViewModels.Financial;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ALOTENNIS.API.Areas.Berber.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IFinancialService _payment;
        public PaymentController(IFinancialService payment)
        {
            _payment = payment;

        }
        [HttpPost]
        public async Task<ActionResult<tbl_FinancialAccount>> CreateAsync([FromBody]FinancialAccountViewModel model)
        {
            try
            {
                var result = await _payment.PaymentAsync(User.Identity.Name.Tolong().Value,model.Cost,"افزایش موجودی از طریق بانک");
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<tbl_FinancialAccount>> ListAsync()
        {
            try
            {
                var result = await _payment.ListAsync(User.Identity.Name.Tolong().Value);
                return Ok(new { Data = result.model.OrderByDescending(x=>x.CreatedDate), message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}