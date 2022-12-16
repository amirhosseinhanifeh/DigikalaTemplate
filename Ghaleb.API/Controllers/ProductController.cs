using ALO.Common.Enums;
using ALO.Common.Utilities.ConvertTo;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using ALO.Service.Interface.Image;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product;
using ALO.ViewModels.Product.Admin;
using ALO.ViewModels.Result;
using Ghaleb.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;

namespace Ghaleb.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _product;
        private readonly IProductCategoryService _productcategoryService;
        private readonly IImageService _imageService;
        private readonly ServiceContext _context;

        public ProductController(IProductService product, IImageService imageService, IProductCategoryService productcategoryService, ServiceContext context)
        {
            _product = product;
            _imageService = imageService;
            _productcategoryService = productcategoryService;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<ProductListForHomeDto>>> GetAllAsync(
        long? mainCategoryId = null,
        string categoryIds = null,
        long? subcategoryId = null,
        string brandIds = null,
        string optionIds = null,
            bool? myposts = null,
            string title = null,
            string order = null,
            int page = 1,
            int pageSize = 100
            )
        {

            var userId = myposts == true ? User.Identity.Name.Tolong() : null;
            var brands = new long[] { };
            var categoryies = new long[] { };
            var options = new long[] { };
            if (brandIds != null)
            {
                brands = JsonConvert.DeserializeObject<long[]>(brandIds);
            }
            if (categoryIds != null)
            {
                categoryies = JsonConvert.DeserializeObject<long[]>(categoryIds);
            }
            if (optionIds != null)
            {
                options = JsonConvert.DeserializeObject<long[]>(optionIds);
            }
            var result = (await _product.GetProductList(mainCategoryId, categoryies, subcategoryId, brands, options, title, order, page, pageSize, userId));
            return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
        }
        [HttpGet]
        public async Task<ActionResult<List<CategoryListForHomeDTO>>> GetAllByCategoryAsync()
        {
            try
            {
                var result = await _product.GetHomeProductsByCategoryList();


                var hasDiscounts = await _context.tbl_Products.Where(h =>h.IsDelete==false && h.IsActive==true && h.ProductPriceHistories.Any(g => g.DiscountPrice != null)).Select(h => new
                {
                    Id = h.Id,
                    Cost = h.GetLastPrice().ToString("n0").toPersianNumber(),
                    Discount = h.GetDiscountPrice() != null ? h.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
                    Image = h.Image.BindImage(),
                    Title = h.Title,
                    Percent = h.CalculatePercent(),
                    Url = h.Url
                }).ToListAsync();

                object YourVisits = null;

                if (User.Identity.IsAuthenticated)
                {
                    YourVisits = await _context.tbl_Products.Where(h => h.IsDelete == false && h.IsActive == true && h.ProductVisits.Any(g => g.UserId == User.UserId())).Select(h => new
                    {
                        Id = h.Id,
                        Cost = h.GetLastPrice().ToString("n0").toPersianNumber(),
                        Discount = h.GetDiscountPrice() != null ? h.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
                        Image = h.Image.BindImage(),
                        Title = h.Title,
                        Url = h.Url,
                        Call = h.GetLastPrice() == 0
                    }).ToListAsync();
                }
                var blogs = await _context.tbl_Blogs.Where(h => h.ShowInHome && h.IsActive && h.IsDelete != true).OrderByDescending(x => x.Id).Take(4).Select(h => new
                {
                    Id = h.Id,
                    Title = h.Title,
                    h.Url,
                    Image = h.Image.BindImage(),
                    h.Visit,
                    h.Abstract
                }).ToListAsync();
                var slideShows = await _context.tbl_SlideShows.Include(x => x.Image).Where(h => h.IsActive && h.IsDelete != true).OrderByDescending(x => x.Id).Take(4).Select(h => new
                {
                    Id = h.Id,
                    Image = h.Image.BindImage(),
                    h.Link,
                }).ToListAsync();

                var blocks = await _context.tbl_Blocks.Where(h => h.IsActive && h.IsDelete != true).OrderBy(x => x.Id).Select(h => new
                {
                    Id = h.Id,
                    h.Title,
                    h.Name,
                    h.Description,
                    Image = h.Image.BindImage(),
                    h.RouteName
                }).ToListAsync();

                var contactus = await _context.tbl_ContactUsDetails.Select(h => new
                {
                    h.Lat,
                    h.Lng,
                    h.Mobile,
                    h.Phone,
                    h.Address,
                    h.Email,
                    h.Tel,

                }).FirstOrDefaultAsync();
                var data = new
                {
                    CategoryProducts = result.model,
                    hasDiscounts,
                    YourVisits,
                    blogs,
                    slideShows,
                    blocks,
                    contactus,
                };
                return Ok(new { Data = data, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        [HttpGet("{id?}")]
        public async Task<ActionResult<List<ProductDetailsForHomeDto>>> GetAsync(long id)
        {
            try
            {
                var result = new ListResultViewModel<ProductDetailsForHomeDto>();
                if (User.Identity.IsAuthenticated)
                {
                    result = await _product.GetProductDetails(id, User.Identity.Name.Tolong());
                    if (result.model != null)
                    {
                        await _product.AddProductVisit(result.model.Id, User.UserId());
                    }
                }
                else
                {
                    result = await _product.GetProductDetails(id);

                }

                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            catch (Exception)
            {
                return Ok(new { message = FailMessage, Status = Status.Failed, NotificationType.error });
            }


        }
        [HttpPost]
        public async Task<IActionResult> Create(RequestCreateProductDTO model)
        {
            if (model.Image != null)
            {
                var stream = new MemoryStream(model.Image);
                var file = new FormFile(stream, 0, model.Image.Length, "salam", "salam.jpeg")
                {
                    Headers = new HeaderDictionary(),
                    ContentType = "image/jpeg",
                };

                System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
                {
                    FileName = file.FileName
                };
                file.ContentDisposition = cd.ToString();
                model.File = file;
            }
            var data = await _product.Create(model, User.Identity.Name.Tolong());
            return Ok(data);
        }
        [HttpPost]
        public async Task<IActionResult> TestFile([FromForm] IFormFile file)
        {
            return Ok("فایل نیومد " + file.Name);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateProductImage(long id, IFormFile file)
        {
            var pr = await _product.Find(id);
            var d = await _imageService.UploadAsync(file, pr.Url);
            var ImageId = await _imageService.CreateAsync(d.model);
            await _product.UpdateImage(id, ImageId.model.Id);
            return Ok(true);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddToFavorite(long id)
        {
            if (User.Identity.IsAuthenticated)
            {
                var res = await _product.AddToFavorite(id, User.Identity.Name.Tolong().Value);
                return Ok(res);
            }
            return Ok(false);
        }
        [HttpGet]
        public async Task<IActionResult> ChartData(string id)
        {
            if (User.Identity.IsAuthenticated)
            {
                var res = await _product.GetChartData(id);
                return Ok(res);
            }
            return Ok(false);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<ProductListForHomeDto>>> GetLastVisits(
    )
        {
            var result = (await _product.GetLastVisitProductList(User.Identity.Name.Tolong().Value));
            return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
        }
        [HttpGet]
        public async Task<ActionResult<List<ProductListForHomeDto>>> GetLastCategoryVisits(
)
        {
            if (User.Identity.IsAuthenticated)
            {
                var result = (await _product.GetLastVisitCategoryList(User.Identity.Name.Tolong().Value));
                return Ok(new { Data = result.model, message = result.Message, Status = result.Status, result.NotificationType });
            }
            return Ok(new { Data = new List<ProductListForHomeDto>() });
        }
        [HttpGet]
        public async Task<IActionResult> Search(string name)
        {
            if (string.IsNullOrEmpty(name))
                return Ok(new { Model = new object[0] });
            var result = await _product.Search(name);
            return Ok(result);
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(long id)
        {
            var pr = _product.Delete(id);
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> GetPrice(long prId, long? colorId = null)
        {
            var data = await _context.tbl_ProductPriceHistory.AsNoTracking().Include(x => x.Product).Where(x => x.ProductId == prId && (colorId != null ? x.ColorId == colorId : true)).Select(x => new
            {
                Id = x.Id,
                productId = x.ProductId,
                Price = x.GetPrice(),
                Discount = x.Product.GetDiscountPrice() != null ? x.Product.GetDiscountPrice().Value.ToString("n0").toPersianNumber() : null,
                DisplayPrice = x.Product.GetLastPrice().ToString("n0").toPersianNumber(),
                Inventory = x.Inventory
            }).FirstOrDefaultAsync();
            return Ok(data);
        }
        [HttpGet]
        public async Task<IActionResult> GetBasketProduct(long id)
        {
            var list = await _context.tbl_ProductPriceHistory.Where(x => x.Id == id && x.Inventory > 0).Select(x => new
            {
                Id = x.Id,
                Image = x.Product.Image.BindImage(),
                Title = x.Product.Title + " (" + x.Color.Name + ")",
                Price = x.GetPrice(),
                DisplayPrice = x.GetPriceValue(),

            }).FirstOrDefaultAsync();
            return Ok(list);
        }
        [HttpGet]
        public async Task<IActionResult> ExportToExcel()
        {
            // Get the user list 
            var products = await _context.tbl_Products.Select(h =>new { h.Id, h.Title,h.ImageId }).ToListAsync();

            var stream = new MemoryStream();
            ExcelPackage.LicenseContext = LicenseContext.Commercial;
            using (var xlPackage = new ExcelPackage(stream))
            {

                var worksheet = xlPackage.Workbook.Worksheets.Add("Products");
                var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");
                namedStyle.Style.Font.UnderLine = true;

                namedStyle.Style.Font.Color.SetColor(Color.Blue);

                worksheet.Cells["A1"].Value = "شناسه";
                worksheet.Cells["B1"].Value = "نام پرینتر";
                worksheet.Cells["C1"].Value = "خلاصه";
                worksheet.Cells["D1"].Value = "متن";
                worksheet.Cells["E1"].Value = "قیمت";
                worksheet.Cells["F1"].Value = "عنوان بالای صفحه";
                worksheet.Cells["G1"].Value = "آدرس صفحه";
                worksheet.Cells["H1"].Value = "کلمات کلیدی";
                worksheet.View.RightToLeft = true;


                // set some core property values
                xlPackage.Workbook.Properties.Title = "لیست محصولات";
                xlPackage.Workbook.Properties.Author = "امیرحسین حنیفه";
                xlPackage.Workbook.Properties.Subject = "لیست محصولات";
                int row = 2;
                foreach (var user in products)
                {
                    worksheet.Cells[row, 1].Value = user.Id;
                    worksheet.Cells[row, 2].Value = user.Title;
                    worksheet.Cells[row, 3].Value = user.ImageId;

                    row++;
                }
                // save the new spreadsheet
                xlPackage.Save();
                // Response.Clear();
            }
            stream.Position = 0;
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "users.xlsx");
        }
        [HttpPost]
        public async Task<IActionResult> AddImageForProducts()
        {
            var products = await _context.tbl_Products.Where(x => x.ImageId == null).ToListAsync();
            foreach (var item in products)
            {
                item.Image = new ALO.DomainClasses.Entity.IMG.tbl_Image
                {
                    Image_thumb=item.Id+".png",

                };
            }
            await _context.SaveChangesAsync();
            return Ok(true);
        }
    }
}
