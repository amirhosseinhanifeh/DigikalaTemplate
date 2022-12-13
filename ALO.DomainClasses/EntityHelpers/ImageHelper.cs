using ALO.DomainClasses.Entity.IMG;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
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

                return _httpContextAccessor.HttpContext.Request.Scheme + "://" + _httpContextAccessor.HttpContext.Request.Host.Value +"/Uploads/Images/"+ model.Image_thumb;
                //return "https://api.amirprinter.ir" +"/Uploads/Images/"+ model.Image_thumb;

            }
            return "http://www.mstp.ir/images-files/Daneshbonyan-Img/2018-4-11-10-4-7-75-8857.jpg";
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
