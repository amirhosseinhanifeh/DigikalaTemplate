using ALO.Common.Enums;
using ALO.Service.Interface.Account;
using ALO.Service.Interface.Profile;
using ALO.ViewModels.Account;
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
    public class RegisterModel : PageModel
    {
        private readonly IUserService _userService;
        private readonly IProfileService _pro;
        public RegisterModel(IUserService userService, IProfileService pro)
        {
            _userService = userService;
            _pro = pro;
        }

        public void OnGet()
        {
        }
        public string Message { get; set; }
        [BindProperty]
        public RegisterViewModel model { get; set; }
        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                var ip = HttpContext.Connection.RemoteIpAddress.ToString();
                model.IP = ip;
                model.Registeredby = Device.Web;
                var result = await _userService.RegisterAsync(model);
                if (result.Status != Status.Failed)
                {
                    await _pro.CreateAsync(result.model.Id, model);
                }
                return RedirectToPage("Login");
            }
            return Page();
        }
    }
}
