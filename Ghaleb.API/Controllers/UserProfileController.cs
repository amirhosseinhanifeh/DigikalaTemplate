using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.PFL;
using ALO.Service.Interface.Profile;
using ALO.ViewModels.Account;
using ALO.ViewModels.Profile;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IProfileService _profile;
        private readonly ServiceContext _context;
        public UserProfileController(IProfileService profile, ServiceContext context)
        {
            _profile = profile;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<GetUserProfileDetailDTO>> GetAsync()
        {
            try
            {
                if(User.Identity.IsAuthenticated)
                {
                    var result = await _profile.GetAsync(User.UserId());
                    return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
                }
                return Ok(null);
            }
            catch (Exception e)
            {
                return Ok(new { message = e.Message, Status = Status.Failed, NotificationType.error });
            }


        }
        [HttpPost]
        public async Task<ActionResult<tbl_Profile>> UpdateProfileAsync([FromBody] RequestForUpdateProfileDTO model)
        {
            try
            {
                var result = await _profile.UpdateAsync(User.Identity.Name.Tolong().Value, model);
                return Ok(new { message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception e)
            {
                return Ok(new { message = e.Message, Status = Status.Failed, NotificationType.error });
            }


        }
        [HttpGet]
        public async Task<IActionResult> GetUserAddresses()
        {
            return Ok(await _context.tbl_UserAddresses.Where(x=>x.UserId==User.UserId()).Select(x =>new
            {
                x.Id,
                x.Address,
                x.Mobile,
                x.Phone,
            }).ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserAddresses(long id)
        {
            return Ok(await _context.tbl_UserAddresses.Where(x => x.UserId == User.UserId() && x.Id==id).Select(x => new
            {
                x.Id,
                x.Address,
                x.Mobile,
                x.Phone,
                Lat = x.Lat,
                Lng = x.Long
            }).FirstOrDefaultAsync());
        }
        [HttpPost]
        public async Task<IActionResult> CreateAddress([FromBody] RequestAddAddressDto model)
        {

            var data = new tbl_UserAddresses
            {
                Address = model.Address,
                Lat = model.Lat,
                Long = model.Lng,
                Mobile = model.Mobile,
                Phone = model.Phone,
                UserId =User.UserId(),
                Pelak=model.Pelak,
                Vahed=model.Vahed,
                IsDefault=false
                
            };
            await _context.tbl_UserAddresses.AddAsync(data);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Id=data.Id,
                Address=data.Address,
                Lat=data.Lat,
                Lng=data.Long,
                Mobile=data.Mobile,
                

            });
        }
    }
    public class RequestAddAddressDto
    {
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Pelak { get; set; }
        public int Vahed { get; set; }

    }
}
