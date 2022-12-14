using ALO.DomainClasses.Entity.IMG;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace Ghaleb.API.Helpers.ModelHelpers
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
            if(model !=null)
            {
                return _httpContextAccessor.HttpContext.Request.Host + _httpContextAccessor.HttpContext.Request.Path+model.Url;

            }
            return "http://www.mstp.ir/images-files/Daneshbonyan-Img/2018-4-11-10-4-7-75-8857.jpg";
        }
    }
}
