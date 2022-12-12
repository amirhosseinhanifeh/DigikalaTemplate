using ALO.Common.Enums;
using ALO.DomainClasses.Entity.Account;
using ALO.Service.Interface.Account;
using ALO.Service.Interface.Profile;
using ALO.ViewModels.Account;
using ALO.ViewModels.Result;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        private readonly IUserService _user;
        private readonly IProfileService _pro;
        private readonly IConfiguration _config;
        private readonly CaptchaVerificationService _captchaVerificationService;

        public AccountController(IUserService user, IProfileService pro, IConfiguration config, CaptchaVerificationService captchaVerificationService)
        {
            _user = user;
            _pro = pro;
            _config = config;
            _captchaVerificationService = captchaVerificationService;
        }
        [HttpGet]
        public ActionResult<ResultViewModel> Get()
        {
            return Ok();
        }

        //api.alotennis.ir/api/Account/token
        [HttpPost]
        [NonAction]
        public async Task<TokenViewModel> GetToken([FromBody] tbl_Users result)
        {
            try
            {
                //if (!ModelState.IsValid)
                //{
                //    return ModelState.Keys.Select(k => ModelState[k].Errors[0].ErrorMessage).First();
                //}

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var claims = new[] {
                new Claim(ClaimTypes.Name, result.Id.ToString()),
                new Claim(ClaimTypes.Role,"User"),
           new Claim(JwtRegisteredClaimNames.UniqueName,result.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, result.Id.ToString()),
                new Claim( JwtRegisteredClaimNames.Sub, "amir"),
                new Claim(ClaimsIdentity.DefaultIssuer,"amir"),
                        new Claim( JwtRegisteredClaimNames.GivenName, "SomeUserID")
            };

                var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                    _config["Jwt:Issuer"],
                    claims,
                    notBefore: DateTime.Now,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: credentials);
                return new TokenViewModel {  Token = new JwtSecurityTokenHandler().WriteToken(token), IsLogin = true };
            }

            catch (Exception e)
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<ActionResult<RegisterViewModel>> Login([FromBody] LoginViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(ModelState.Keys.Select(k => ModelState[k].Errors[0].ErrorMessage).First());
                }
                var result = await _user.Authenticate(model.UserName, model.Password);

                if (result.Status == Status.Success)
                {
                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
                    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    var claims = new[] {
                new Claim("Id", result.model.Id.ToString()),
                new Claim(ClaimTypes.Name, result.model.Email.ToString()),
                new Claim(ClaimTypes.Role,"User"),
                new Claim(JwtRegisteredClaimNames.Jti,result.model.Id.ToString())
            };

                    var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                        _config["Jwt:Issuer"],
                        claims,
                        notBefore: DateTime.Now,
                        expires: DateTime.Now.AddDays(1),
                        signingCredentials: credentials);
                    return Ok(new
                    {
                        Data = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            Id = result.model.Id,
                            FirstName = result.model.Profile.FirstName ,
                            LastName= result.model.Profile.LastName,
                            Mobile=result.model.Mobile
                        }
                    }
                    );
                }
                else
                {
                    return null;
                }
            }

            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task<ActionResult<ResultViewModel>> GetMobileAndSendCode([FromBody] VerificationViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { Status = Status.Warning, NotificationType = NotificationType.warning, Message = ModelState.Keys.Select(k => ModelState[k].Errors[0].ErrorMessage).First() });
                }

                var result = await _user.GenerateCodeAsync(model.Mobile);
                return Ok(new { result.Status, result.NotificationType, result.Message, Data = result.model });
            }

            catch (Exception e)
            {
                return Ok(new { Status = Status.Warning, NotificationType = NotificationType.warning, Message = FailMessage });
            }
        }

        [HttpPost]
        public async Task<IActionResult> GetCodeAndCheck([FromBody] VerificationViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Ok(new { Status = Status.Warning, NotificationType = NotificationType.warning, Message = ModelState.Keys.Select(k => ModelState[k].Errors[0].ErrorMessage).First() });
                }

                var result = await _user.CheckCode(model.Mobile, model.Code);
                if (result.model)
                {

                    var user = await _user.GetUserAsync(model.Mobile);
                    if (user.model==null)
                    {
                        var dt = await _user.RegisterAsync(new RegisterViewModel
                        {
                            Email=model.Mobile,
                            Mobile=model.Mobile,
                            ConfirmPassword="123456",
                            Password="123456",
                            IP=null,
                            Registeredby=Device.Android,
                            
                        });
                        var ttoken = await GetToken(dt.model);
                        await _user.RemoveMobileCodeAsync(model.Mobile);

                        return Ok(new { Status = Status.Success, NotificationType = NotificationType.success, Message = SuccessfullMessage, Data = ttoken });

                    }
                    var token = await GetToken(user.model);

                    return Ok(new { Status = Status.Success, NotificationType = NotificationType.success, Message = SuccessfullMessage, Data = token });

                }

                return Ok(new { Status = Status.Success, NotificationType = NotificationType.success, Message = SuccessfullMessage, Data = false });
            }

            catch (Exception e)
            {
                return Ok(new { Status = Status.Warning, NotificationType = NotificationType.warning, Message = FailMessage });
            }
        }

        //api.alotennis.ir/api/Account/Register
        [HttpPost]
        public async Task<ActionResult<ResultViewModel>> Register([FromBody] RegisterViewModel model)
        {
            try
            {
                //var requestIsValid = await this._captchaVerificationService.IsCaptchaValid(model.CaptchaResponse);

                //if (!requestIsValid)
                //{
                //    return Ok(new { Status = Status.Failed, NotificationType = NotificationType.error ,Message ="کپچا معتبر نمی باشد" });

                //}
                if (!ModelState.IsValid)
                {
                    return Ok(new { Status = Status.Warning, NotificationType = NotificationType.warning, Message = ModelState.Keys.Select(k => ModelState[k].Errors[0].ErrorMessage).First() });
                }
                ListResultViewModel<tbl_Users> result = await _user.RegisterAsync(model);
                if (result.Status != Status.Failed)
                {
                    await _pro.CreateAsync(result.model.Id, model);
                    var tResult = await GetToken(result.model);
                    return Ok(new
                    {
                        Status = Status.Success.ToString(),
                        NotificationType = NotificationType.success.ToString(),
                        Message = SuccessfullMessage,
                        Data = new
                        {
                            token = tResult.Token,
                            id = result.model.Id
                        }
                    });
                }
                return Ok(new
                {
                    Status = result.Status.ToString(),
                    NotificationType = result.NotificationType.ToString(),
                    Message = result.Message,
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
        [HttpGet]
        public ActionResult<ListResultViewModel<bool>> CheckUserIsLogin()
        {
            try
            {
                if (User.Identity.IsAuthenticated)
                {

                    return Ok(new
                    {
                        Status = Status.Success.ToString(),
                        NotificationType = NotificationType.success.ToString(),
                        Message = SuccessfullMessage,
                        Data = true
                    });
                }
                return Ok(new
                {
                    Status = Status.Failed.ToString(),
                    NotificationType = NotificationType.error.ToString(),
                    Message = "",
                    Data = false
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
