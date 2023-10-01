using ALO.Common.Enums;
using ALO.Service.Interface.Account;
using AspNetCore.ReCaptcha;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Ghaleb.Web.Pages.Account
{
    [ValidateReCaptcha]
    public class LoginModel : PageModel
    {
        private readonly IUserService _userService;

        public LoginModel(IUserService userService)
        {
            _userService = userService;
        }

        public void OnGet()
        {
        }
        public string Message { get; set; }
        public async Task<IActionResult> OnPostAsync(string username, string password, string ReturnUrl = null)
        {
            var result = await _userService.Authenticate(username, password);
            if (result.Status == Status.Success)
            {

                var claims = new[] {
                new Claim("Id", result.model.Id.ToString()),
                new Claim(ClaimTypes.Name, result.model.Profile.FirstName+" "+result.model.Profile.LastName),
                new Claim(ClaimTypes.Role,"User"),
                new Claim(JwtRegisteredClaimNames.Jti,result.model.Id.ToString())
                };

                var claimsIdentity = new ClaimsIdentity(
                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    //AllowRefresh = <bool>,
                    // Refreshing the authentication session should be allowed.

                    //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                    // The time at which the authentication ticket expires. A 
                    // value set here overrides the ExpireTimeSpan option of 
                    // CookieAuthenticationOptions set with AddCookie.

                    //IsPersistent = true,
                    // Whether the authentication session is persisted across 
                    // multiple requests. When used with cookies, controls
                    // whether the cookie's lifetime is absolute (matching the
                    // lifetime of the authentication ticket) or session-based.

                    //IssuedUtc = <DateTimeOffset>,
                    // The time at which the authentication ticket was issued.

                    //RedirectUri = <string>
                    // The full path or absolute URI to be used as an http 
                    // redirect response value.
                    IsPersistent= true,
                    RedirectUri = ReturnUrl,
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);
                if (ReturnUrl == null)
                    return Redirect("~/");
                return Redirect(ReturnUrl);
            }
            else
            {
                Message = "نام کاربری و رمز عبور اشتباه می باشد";
                return Page();
            }
        }
    }
}
