﻿using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Forms;
using AyandeNama.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Forms
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class FormContactusController : Controller
    {
        private readonly ServiceContext _context;
        private WebsiteBase _websitebase;
        public FormContactusController(ServiceContext context,
            WebsiteBase websitebase)
        {
            _context = context;
            _websitebase = websitebase;
        }
        public async Task<IActionResult> Index()
        {
            var lan = _websitebase.GetCurrectLanguageIdAsync;

            return View(await _context.GetAllAsync<tbl_FormContantUs>().ToListAsync());
        }
        [HttpGet]
        public async Task<IActionResult> Details(long id)
        {
            return View(await _context.tbl_FormContantUs.Where(x=>x.Id==id).FirstOrDefaultAsync());
        }
    }
}
