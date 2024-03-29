﻿using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Ghaleb.Web.Pages.ViewComponents.Address
{
    public class AddressViewComponent : ViewComponent
    {


        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View();
        }
    }
}
