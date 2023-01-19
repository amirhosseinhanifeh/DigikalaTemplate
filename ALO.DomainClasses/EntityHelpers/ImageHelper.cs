using ALO.DomainClasses.Entity.IMG;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.DomainClasses.EntityHelpers
{
    public static class ImageHelper
    {
        private static IHttpContextAccessor _httpContextAccessor;

        static ImageHelper()
        {
            _httpContextAccessor = new HttpContextAccessor();

        }
        public static string BindImage(this tbl_Image model,IConfiguration configuration)
        {
            if (model != null)
            {
               
                return configuration["SiteSetting:ApiUrl"] + "/Uploads/Images/" + model.Image_thumb;

            }
            return "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
        }
        public static string BindFile(this tbl_File model)
        {
            if (model != null)
            {
                return _httpContextAccessor.HttpContext.Request.Scheme + "://" + _httpContextAccessor.HttpContext.Request.Host.Value + model.Url;

            }
            return null;
        }

    }
}
