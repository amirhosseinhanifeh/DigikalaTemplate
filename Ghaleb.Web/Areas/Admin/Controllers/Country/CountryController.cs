using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Blog;
using ALO.DomainClasses.Entity.City;
using ALO.DomainClasses.Entity.Country;
using ALO.ViewModels.BlogCategory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers.Country
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class CountryController : Controller
    {
        private readonly ServiceContext _context;

        public CountryController(ServiceContext serviceContext)
        {
            _context = serviceContext;
        }

        public async Task<IActionResult> Index(string? name = null)
        {
            ViewBag.Name = name;
            return View(await _context.GetAllAsync<tbl_Country>().Where(x => string.IsNullOrEmpty(name) || x.Name.Contains(name)).ToListAsync());
        }

        public async Task<IActionResult> Create(long? Id)
        {
            return View(await _context.tbl_Country.FirstOrDefaultAsync(x => x.Id == Id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(long? Id, tbl_Country model)
        {
            var data = await _context.tbl_Country.FirstOrDefaultAsync(x => x.Id == Id);
            if (data != null)
            {
                data.Name = model.Name;
                data.IsActive = model.IsActive;
            }
            else
            {
                await _context.tbl_Country.AddAsync(model);

            }
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        public async Task<IActionResult> Delete(long Id)
        {
            var data = await _context.tbl_Country.FirstOrDefaultAsync(x => x.Id == Id);
            data.IsDelete = true;
            data.IsActive = false;
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
