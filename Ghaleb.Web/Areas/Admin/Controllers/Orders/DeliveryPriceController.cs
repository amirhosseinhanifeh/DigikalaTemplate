using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.API.Areas.Admin.Controllers.Orders
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]

    public class DeliveryPriceController : Controller
    {
        private readonly ServiceContext _context;
        public DeliveryPriceController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.GetAllAsync<tbl_DeliveryPrice>().ToListAsync());
        }
        public async Task<IActionResult> Edit(long? Id)
        {

            var result = await _context.GetAsync<tbl_DeliveryPrice>(x => x.Id == Id);

            return View(result);
        }
        [HttpPost]
        public async Task<JsonResult> Edit(tbl_DeliveryPrice model)
        {
            try
            {
                var data = await _context.GetAsync<tbl_DeliveryPrice>(x => x.Id == model.Id);
                if (data == null)
                {

                    _context.CreateBaseEntity<tbl_DeliveryPrice>(model);

                }
                else
                {
                    data.Name = model.Name;
                    data.Cost = model.Cost;
                    data.FromPrice = model.FromPrice;
                }
                await _context.SaveChangesAsync();

                return Json(new { Data = "", message = ALO.Common.Messages.Message.SuccessfullMessage, Status = Status.Success, NotificationType.success });
            }
            catch (Exception)
            {
                return Json(new { message = ALO.Common.Messages.Message.FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public async Task<IActionResult> Delete(long? Id)
        {
            if (Id == null)
                return Redirect("~/");

            var result = await _context.GetAsync<tbl_DeliveryPrice>(x => x.Id == Id);
            if (result == null)
                return Redirect("~/");

            _context.SoftDeletedBaseEntity<tbl_DeliveryPrice>(result);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
