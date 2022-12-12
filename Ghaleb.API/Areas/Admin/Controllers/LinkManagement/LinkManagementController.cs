using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.LinkManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace AyandeNama.Web.Areas.Admin.Controllers.LinkManagement
{
    [Area("Admin")]

    public class LinkManagementController : Controller
    {
        private readonly ServiceContext _context;
        public LinkManagementController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index(long? Id)
        {
            ViewBag.Id = Id;
            return View(await _context.GetAllAsync<tbl_LinkManagement>(x=>x.GroupLinkManagementId==Id).ToListAsync());
        }
        public async Task<IActionResult> Create(long? GroupLinkManagementId,long? Id)
        {
            var data = await _context.GetAsync<tbl_LinkManagement>(x => x.Id == Id);
            if(data ==null)
            {
                data = new tbl_LinkManagement(); 
                data.GroupLinkManagementId = GroupLinkManagementId.GetValueOrDefault();
            }
            return View(data);
        }
        [HttpPost]
        public async Task<JsonResult> Create(tbl_LinkManagement model)
        {

            try
            {

                var data = await _context.GetAsync<tbl_LinkManagement>(x => x.Id == model.Id);
                if (data == null)
                {
                    _context.CreateBaseEntity<tbl_LinkManagement>(model);

                }
                else
                {
                    data.Abstract = model.Abstract;
                    data.Description = model.Description;
                    data.ImageId = model.ImageId;
                    data.MetaDescription = model.MetaDescription;
                    data.MetaKeyword = model.MetaKeyword;
                    data.Order = model.Order;
                    data.PageTitle = model.PageTitle;
                    data.Title = model.Title;
                    data.Url = model.Url;
                    data.Link = model.Link;

                }
                await _context.SaveChangesAsync();
                return Json(new { Data = data, message = SuccessfullMessage, Status = Status.Success, NotificationType.success });
            }
            catch (Exception e)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        public async Task<IActionResult> Delete(long? Id)
        {
            if (Id == null)
                return Redirect("~/");

            var result = await _context.GetAsync<tbl_LinkManagement>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_LinkManagement>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
