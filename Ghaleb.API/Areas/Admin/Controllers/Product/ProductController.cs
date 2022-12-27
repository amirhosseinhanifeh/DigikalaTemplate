using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product.Admin;
using ALO.ViewModels.Result;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Areas.Admin.Controllers.Product
{
    [Area("Admin")]

    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        private readonly IProductCategoryService _productCategoryService;
        private readonly IProductSubCategoryService _productSubCategoryService;
        private readonly ServiceContext _context;
        public ProductController(IProductService productService,
            IProductCategoryService productCategoryService,
            IProductSubCategoryService productSubCategoryService,
            ServiceContext context)
        {
            _productService = productService;
            _productCategoryService = productCategoryService;
            _productSubCategoryService = productSubCategoryService;
            _context = context;
        }

        public async Task<IActionResult> Index(long? brandId)

        {
            var Result = await _productService.GetProductListForAdmin(brandId);
            return View(Result.model);
        }
        public async Task<IActionResult> Create()
        {
            ViewBag.MainCategories = new SelectList(await _context.tbl_MainProductCategory.ToListAsync(), "Id", "Name");
            ViewBag.Categories = new SelectList((await _productCategoryService.GetProductCategoriesSelect()).model, "Id", "Value");
            ViewBag.SubCategories = new SelectList(new List<DropDownListDTO>(), "Id", "Value");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> Create(AddProductForAdminDTO model)
        {

            try
            {
                var result = await _productService.AddProductForAdmin(model);
                return Json(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        public async Task<IActionResult> Edit(long Id)
        {
            var result = await _productService.GetProductForAdmin(Id);
            ViewBag.MainCategories = new SelectList(await _context.tbl_MainProductCategory.ToListAsync(), "Id", "Name", result.model.MainProuctCategoryId);
            ViewBag.Categories = new SelectList((await _productCategoryService.GetProductCategoriesSelect(result.model.MainProuctCategoryId)).model, "Id", "Value", result.model.ProductCategoryId);
            ViewBag.SubCategories = new SelectList((await _productSubCategoryService.GetSubCategorySelect(result.model.ProductCategoryId)).model, "Id", "Value", result.model.SubProductCategoryId);
            ViewBag.Brands = new SelectList((await _context.tbl_Brands.Where(h => result.model.MainProuctCategoryId != null ? h.MainProductCategoryId == result.model.MainProuctCategoryId : true).Select(h => new { Id = h.Id, Value = h.Name }).ToListAsync()), "Id", "Value", result.model.BrandId);
            return View(result.model);
        }
        [HttpPost]
        public async Task<JsonResult> Edit(AddProductForAdminDTO model)
        {

            try
            {
                var result = await _productService.UpdateProductForAdmin(model);
                return Json(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Json(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }
        }
        public async Task<IActionResult> GetFields(long? categoryId, long? subcategoryId, long? productId = null)
        {
            IEnumerable<tbl_ProductCustomFields> list = new List<tbl_ProductCustomFields>();
            ViewBag.ProductID = productId;
            if (categoryId != null)
            {
                list = await _context.tbl_ProductCustomFields.Include(x => x.ProductCustomFieldValues).Include(x => x.ProductCustomFieldsOptionValues).Where(x => categoryId != null ? x.ProductCategoryId == categoryId : true).ToListAsync();
            }
            if(subcategoryId !=null)
            {
                List<tbl_ProductCustomFields> list2 = new List<tbl_ProductCustomFields>();

                list2 = await _context.tbl_ProductCustomFields.Include(x => x.ProductCustomFieldValues).Include(x => x.ProductCustomFieldsOptionValues).Where(x =>  subcategoryId != null ? x.SubProductCategoryId == subcategoryId : true).ToListAsync();
                list = list.Union(list2);
            }
            return PartialView(list.ToList());
        }
        public IActionResult Delete(long Id)
        {
            _productService.Delete(Id);
            return RedirectToAction("Index");
        }
        [HttpGet]
        public async Task<IActionResult> GetBrands(long? mainProductCategoryId)
        {
            var data = await _context.tbl_Brands.Where(x => x.MainProductCategoryId == mainProductCategoryId).Select(x => new
            {
                Id = x.Id,
                Value = x.Name
            }).ToListAsync();
            return Json(data);
        }
        [HttpPost]
        public async Task<IActionResult> ImportExcel([FromForm] IFormFile batchUsers,
            long ProductCategoryId,
            long MainProuctCategoryId,
            long BrandId,
            long SubProductCategoryId

            )
        {

            if (ModelState.IsValid)
            {
                if (batchUsers?.Length > 0)
                {
                    var stream = batchUsers.OpenReadStream();
                    List<tbl_Product> users = new List<tbl_Product>();
                    try
                    {
                        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                        using (var package = new ExcelPackage(stream))
                        {
                            var worksheet = package.Workbook.Worksheets.First();//package.Workbook.Worksheets[0];
                            var rowCount = worksheet.Dimension.Rows;

                            for (var row = 2; row <= rowCount; row++)
                            {
                                try
                                {

                                    var Title = worksheet.Cells[row, 1].Value?.ToString();
                                    var EnTitle = worksheet.Cells[row, 2].Value?.ToString();
                                    var Abstract = worksheet.Cells[row, 3].Value?.ToString();
                                    var Description = worksheet.Cells[row, 4].Value?.ToString();
                                    var Color = worksheet.Cells[row, 5].Value?.ToString();
                                    var Inventory = worksheet.Cells[row, 6].Value?.ToString();
                                    var Cost = worksheet.Cells[row, 7].Value != null ? decimal.Parse(worksheet.Cells[row, 7].Value?.ToString()) : 0;
                                    var PageTitle = worksheet.Cells[row, 8].Value?.ToString();
                                    var Url = worksheet.Cells[row, 9].Value?.ToString().Replace(' ', '-');
                                    var MetaKeywords = worksheet.Cells[row, 10].Value?.ToString();
                                    var MetaDescription = worksheet.Cells[row, 11].Value?.ToString();
                                    if (!_context.tbl_Products.Any(x => x.Url == Url))
                                    {
                                        var data = new tbl_Product
                                        {
                                            Abstract = Abstract,
                                            Description = Description,
                                            IsSpecial = false,
                                            Url = Url.Replace(' ', '-'),
                                            Title = Title,
                                            SubProductCategoryId = SubProductCategoryId,
                                            PageTitle = PageTitle,
                                            MetaKeyword = MetaKeywords,
                                            ImageId = null,
                                            MetaDescription = MetaDescription,
                                            MainProductCategoryId = MainProuctCategoryId,
                                            BrandId = BrandId,
                                            ProductCategoryId = ProductCategoryId,
                                            State = ProductState.ACTIVED,
                                            EnTitle = EnTitle,


                                        };
;
                                        data.ProductPriceHistories = new List<tbl_ProductPriceHistory>();
                                        var color = await _context.tbl_Colors.FirstOrDefaultAsync(h => h.Name == Color);
                                        if (color != null)
                                        {
                                            data.ProductPriceHistories.Add(new tbl_ProductPriceHistory
                                            {
                                                ColorId = color.Id,
                                                Price = Cost,
                                                DiscountPrice = null,
                                                Inventory = Inventory != null ? int.Parse(Inventory) : 0
                                            });
                                        }
                                        await _context.tbl_Products.AddAsync(data);
                                        await _context.SaveChangesAsync();
                                       
                                    }


                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine("Something went wrong");
                                }
                            }
                        }

                        return View("Index", users);

                    }
                    catch (Exception e)
                    {
                        return View();
                    }
                }
            }

            return View();
        }
        [HttpGet]
        public async Task<IActionResult> ChangeStatus(long id)
        {
            var data =await _context.tbl_Products.FindAsync(id);
            data.IsActive = !data.IsActive;
            await _context.SaveChangesAsync();
            return Json(new { message = SuccessfullMessage, Status = Status.Success, NotificationType.success });
        }
    }
}
