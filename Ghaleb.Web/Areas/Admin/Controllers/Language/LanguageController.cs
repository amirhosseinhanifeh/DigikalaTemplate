using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Language;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AyandeNama.Web.Areas.Admin.Controllers.Language
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class LanguageController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ServiceContext _context;
        private readonly CookieHelper _cookie;
        public LanguageController(ServiceContext context,

            CookieHelper cookie)
        {
            _context = context;
            _cookie = cookie;
        }

        public async Task<IActionResult> ChangeLanguage(string lan="fa",string ReturnUrl="")
        {
            var Result =await _context.GetAsync<tbl_Language>(x => x.LanguageCode == lan);
            if(Result !=null)
            {
                _cookie.SetCookie("Lan", Result.Id);
                if(!string.IsNullOrEmpty(ReturnUrl))
                    return Redirect(ReturnUrl);
            }
            return Redirect("~/Admin/Dashboard");
        }
    }
}
