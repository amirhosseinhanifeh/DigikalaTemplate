using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Forms;
using ALO.Service.Interface.Forms;
using ALO.ViewModels.Forms;
using Ghaleb.API.Helpers;
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
    public class FormContactUsController : ControllerBase
    {
        private readonly IFormContactUsService _frmcontact;
        private readonly ServiceContext _context;
        public FormContactUsController(IFormContactUsService frmcontact, ServiceContext context)
        {
            _frmcontact = frmcontact;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> CreateAsync([FromBody] FormContactUsDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { Status = Status.Warning, NotificationType = NotificationType.warning, Message = ModelState.Keys.Select(k => ModelState[k].Errors[0].ErrorMessage).First() });
                }
                
                var result = await _frmcontact.CreateAsync(model);


                return Ok(new
                {
                    Status = Status.Success.ToString(),
                    NotificationType = NotificationType.success.ToString(),
                    Message = SuccessfullMessage,
                    Data = true
                });
            }

            catch (Exception e)
            {
                return Ok(new
                {
                    Status = Status.Warning,
                    NotificationType = NotificationType.warning,
                    Message = e.Message
                });
            }
        }

        [HttpPost]
        public async Task<ActionResult<bool>> CreateRepairAsync([FromBody] FormRepairDTO model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { Status = Status.Warning, NotificationType = NotificationType.warning, Message = ModelState.Keys.Select(k => ModelState[k].Errors[0].ErrorMessage).First() });
                }

                 await _context.tbl_FormRepairs.AddAsync(new tbl_FormRepair
                 {
                     Body=model.Body,
                     FirstName=model.FirstName,
                     LastName=model.LastName,
                     Mobile=model.Mobile,
                     UserId=User.Identity.IsAuthenticated? User.UserId():null

                 });
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Status = Status.Success.ToString(),
                    NotificationType = NotificationType.success.ToString(),
                    Message = SuccessfullMessage,
                    Data = true
                });
            }

            catch (Exception e)
            {
                return Ok(new
                {
                    Status = Status.Warning,
                    NotificationType = NotificationType.warning,
                    Message = e.Message
                });
            }
        }
    }
}
