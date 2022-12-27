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

        public static string BindImage(this tbl_Image model)
        {
            if (model != null)
            {
                //if (_httpContextAccessor.HttpContext.Request.Host.Host.Contains("localhost"))
                //{
                //    return _httpContextAccessor.HttpContext.Request.Scheme + "://" + _httpContextAccessor.HttpContext.Request.Host + "/Uploads/Images/" + model.Image_thumb;

                //}
                //return _httpContextAccessor.HttpContext.Request.Scheme + "://api." + _httpContextAccessor.HttpContext.Request.Host.Host.Split(".")[1] + "." + _httpContextAccessor.HttpContext.Request.Host.Host.Split(".")[2] + "/Uploads/Images/" + model.Image_thumb;
                //return "https://api.qiratinstruments.com" + "/Uploads/Images/" + model.Image_thumb;
                return "https://api.amirprinter.ir" + "/Uploads/Images/" + model.Image_thumb;

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
