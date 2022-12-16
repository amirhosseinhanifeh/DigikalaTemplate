using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using ALO.Service.Interface.Product;
using ALO.ViewModels.Product;
using ALO.ViewModels.Result;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static ALO.Common.Messages.Message;
using Binbin.Linq;
using ALO.ViewModels.ProductComment;
using ALO.ViewModels.Product.Admin;
using ALO.DomainClasses.EntityHelpers;
using Microsoft.EntityFrameworkCore;
using ALO.Common.Utilities.ConvertTo;
using ALO.Common.Utilities.ConvertDt;
using ALO.Service.Interface.Image;

namespace ALO.Service.Service.Product
{
    public class ProductService : IProductService
    {
        private readonly ServiceContext _db;
        private readonly IImageService _imageService;


        public ProductService(ServiceContext db, IImageService imageService)
        {
            _db = db;
            _imageService = imageService;
        }

        public async Task<ListResultViewModel<bool>> AddProductForAdmin(AddProductForAdminDTO model)
        {
            try
            {
                if (!_db.tbl_Products.Any(y => y.Url == model.Url && y.IsDelete != true))
                {
                    var data = new tbl_Product
                    {
                        Abstract = model.Abstract,
                        Description = model.Description,
                        IsSpecial = model.IsSpecial,
                        Url = model.Url,
                        Title = model.Title,
                        SubProductCategoryId = model.SubProductCategoryId,
                        PageTitle = model.PageTitle,
                        MetaKeyword = model.MetaKeyword,
                        ImageId = model.ImageId,
                        MetaDescription = model.MetaDescription,
                        MainProductCategoryId = model.MainProuctCategoryId,
                        BrandId = model.BrandId,
                        ProductCategoryId = model.ProductCategoryId,
                        State = ProductState.ACTIVED,
                        EnTitle = model.EnTitle,
                        FileId=model.FileId,
                        

                    };
                    data.ProductCustomFieldValues = new List<tbl_ProductCustomFieldValues>();
                    data.ProductPriceHistories = new List<tbl_ProductPriceHistory>();
                    if (model.Values != null)
                    {
                        foreach (var item in model.Values)
                        {
                            if (item.Value != null || item.OptionId != null)
                            {
                                data.ProductCustomFieldValues.Add(new tbl_ProductCustomFieldValues
                                {
                                    ProductCustomFieldId = item.FieldId,
                                    PersianValue = item.Value,
                                    Value = item.Value,
                                    ProductCustomFieldsOptionValueId = item.OptionId,
                                });
                            }
                        }
                    }
                    data.ProductPriceHistories.Add(new tbl_ProductPriceHistory
                    {
                        Price = model.Cost,
                        DiscountPrice = model.Discount,
                        Inventory = model.Inventory
                    });
                    _db.CreateBaseEntity(data);
                    await _db.SaveChangesAsync();

                    return new ListResultViewModel<bool>
                    {
                        model = true,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<bool>
                {
                    model = false,
                    Message = "محتوای آدرس تکراری می باشد",
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<bool>
                {
                    Message = FailMessage,
                    model = false,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
        private static Random random = new Random();

        public static string RandomString(int length)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public async Task<long> Create(RequestCreateProductDTO model, long? userId)
        {
            var category = await _db.tbl_SubProductCategories.Include(x => x.ProductCategory).ThenInclude(x => x.MainProuctCategory).FirstOrDefaultAsync(x => x.Id == model.SubCategoryId);
            var pr = new tbl_Product
            {
                Abstract = model.Title,
                Title = model.Title,
                CityId = 1,
                Description = model.Description,
                IsSpecial = false,
                SubProductCategoryId = model.SubCategoryId,
                MainProductCategoryId = category.ProductCategory.MainProuctCategoryId,
                ProductCategoryId = category.ProductCategoryId,
                Url = RandomString(8),
                OwnerId = userId

            };
            if (model.Values != null && model.Values.Any())
            {

                pr.ProductCustomFieldValues = new List<tbl_ProductCustomFieldValues>();
                foreach (var item in model.Values)
                {
                    if (item.OptionId == null && item.Value == null)
                    {

                    }
                    else
                    {
                        pr.ProductCustomFieldValues.Add(new tbl_ProductCustomFieldValues
                        {
                            PersianValue = item.Value,
                            Value = item.Value,
                            ProductCustomFieldId = item.FieldId,
                            ProductCustomFieldsOptionValueId = item.OptionId,

                        });
                    }


                }

            }


            if (model.Image != null)
            {
                var d = await _imageService.UploadAsync(model.File, pr.Url);
                var ImageId = await _imageService.CreateAsync(d.model);
                pr.ImageId = ImageId.model.Id;

            }
            await _db.tbl_Products.AddAsync(pr);
            await _db.SaveChangesAsync();
            return pr.Id;
        }

        public ListResultViewModel<bool> Delete(long Id)
        {
            try
            {
                var result = _db.GetAsync<tbl_Product>(x => x.Id == Id).Result;
                result.State = ProductState.DELETED;
                _db.SoftDeletedBaseEntity(result);
                _db.SaveChangesAsync();
                return new ListResultViewModel<bool>
                {
                    model = true,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<bool>
                {
                    Message = FailMessage,
                    model = false,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<IEnumerable<CategoryListForHomeDTO>>> GetHomeProductsByCategoryList()
        {
            try
            {
                var result = (await _db.GetAllAsync<tbl_SubProductCategory>(x => x.ShowInHome == true, new string[] { "ProductCategory", "Products", "Products.Image", "Products.ProductPriceHistories" }).OrderByDescending(x => x.Id).ToListAsync())
                    .Select(x => new CategoryListForHomeDTO
                    {
                        Title = x.Title,
                        Id = x.Id,
                        Products = x.Products.Where(x => x.IsActive == true && x.IsDelete == false).OrderByDescending(x=>x.Id).Take(10).Select(y => new ProductListForHomeDto
                        {
                            Id = y.Id,
                            Abstract = y.Abstract,
                            Discount = y.GetDiscountPrice() !=null?y.GetDiscountPrice().Value.ToString("n0").toPersianNumber():null,
                            Cost = y.GetLastPrice().ToString("n0").toPersianNumber(),
                            Image = y.Image.BindImage(),
                            IsSpecial = y.IsSpecial,
                            Title = y.Title,
                            Url = y.Url,
                            Call = y.GetLastPrice() == 0

                        }).ToList(),

                        Url = x.Url

                    }).ToList();
                return new ListResultViewModel<IEnumerable<CategoryListForHomeDTO>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<CategoryListForHomeDTO>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<ProductDetailsForHomeDto>> GetProductDetails(long url, long? UserId = null)
        {

            try
            {
                var query = await _db.tbl_Products
                    .Include(x => x.Brand)
                    .Include(x => x.SubProductCategory)
                    .ThenInclude(x => x.ProductCategory)
                    .Include(x => x.Users)
                    .Include(x => x.Image)
                    .Include(x => x.Images)
                    .Include(x => x.ProductComments)
                    .Include(x => x.ProductCustomFieldValues)
                    .ThenInclude(x => x.ProductCustomField)
                    .ThenInclude(x => x.ProductCustomFieldsOptionValues)
                    .Include(x => x.ProductPriceHistories)
                    .ThenInclude(x => x.Color)
                    .FirstOrDefaultAsync(x => x.Id == url);
                if (query == null)
                    return new ListResultViewModel<ProductDetailsForHomeDto>
                    {
                        model = null,
                        Message = NotFoundMessage,
                        NotificationType = NotificationType.error,
                        Status = Status.Warning
                    };

                var Result = new ProductDetailsForHomeDto
                {
                    EnTitle=query.EnTitle,
                    Abstract = query.Abstract,
                    Category = query.SubProductCategory != null ? new ProductBrandDto
                    {
                        Id = query.SubProductCategory.Id,
                        Name = query.SubProductCategory.Title,
                        Url = query.SubProductCategory.Url
                    } : null,
                    Colors = query.ProductPriceHistories.Select(x => x.Color).Select(h => new ProductBrandDto
                    {
                        Id = h.Id,
                        Name = h.Name
                    }).ToList(),
                    CostDisplay = query.GetLastPrice().ToString("n0").toPersianNumber(),
                    Cost = query.GetLastPrice(),
                    Description = query.Description,
                    Image = query.Image.BindImage(),
                    Title = query.Title,
                    IsSpecial = query.IsSpecial,
                    State = query.State.ToString(),
                    SubCategory = query.SubProductCategory.Title,
                    MetaDescription = query.MetaDescription,
                    MetaKeyword = query.MetaKeyword,
                    PageTitle = query.PageTitle,
                    Url = query.Url,
                    Id = query.Id,
                    Brand = query.Brand != null ? new ProductBrandDto
                    {
                        Id = query.Brand.Id,
                        Name = query.Brand.Name,
                    } : null,
                    Date = query.CreatedDate.RelativeDate().toPersianNumber(),
                    //IsBuy = UserId == null ? null : query.OrderDetails.Any(x => x.Order.UserId == UserId),
                    Images = query.Images.Select(y => new ProductGalleryDTO { Url = y.BindImage() }).ToList(),
                    Comments = query.ProductComments.Select(y => new ProductCommentForWebsiteDto
                    {
                        Body = y.Body,
                        FullName = y.FullName,
                        Response = y.Response,
                        Date = y.CreatedDate.ConvertToPesainDate().toPersianNumber()
                    }).ToList(),
                    Values = query.ProductCustomFieldValues.Select(x => new ProductCustomFields
                    {
                        Name = x.ProductCustomField.Name,
                        Value = x.ProductCustomFieldsOptionValueId == null ? x.Value.toPersianNumber() : x.ProductCustomFieldsOptionValue?.Value
                    }).ToList(),
                    IsFavorite = query.Users.Any(x => x.Id == UserId)

                };
                return new ListResultViewModel<ProductDetailsForHomeDto>
                {
                    model = Result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<ProductDetailsForHomeDto>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<AddProductForAdminDTO>> GetProductForAdmin(long Id)
        {
            try
            {

                var result = (await _db.GetAsync<tbl_Product>(x => x.Id == Id, includes: new string[] {  "ProductPriceHistories" }));
                var data = new AddProductForAdminDTO
                {
                    Abstract = result.Abstract,
                    Description = result.Description,
                    IsSpecial = result.IsSpecial,
                    ImageId = result.ImageId,
                    PageTitle = result.PageTitle,
                    MetaKeyword = result.MetaKeyword,
                    Id = result.Id,
                    MetaDescription = result.MetaDescription,
                    ProductCategoryId = result.ProductCategoryId,
                    SubProductCategoryId = result.SubProductCategoryId,
                    Title = result.Title,
                    Url = result.Url,
                    BrandId=result.BrandId,
                    EnTitle=result.EnTitle,
                    MainProuctCategoryId=result.MainProductCategoryId
                };

                return new ListResultViewModel<AddProductForAdminDTO>
                {
                    model = data,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<AddProductForAdminDTO>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
        public async Task<ListResultViewModel<IEnumerable<ProductListForHomeDto>>> GetLastVisitProductList(long userId)
        {
            var result = await _db.GetAllAsync<tbl_ProductVisits>(x => x.UserId == userId, new string[] { "Product", "Product.Image", "Product.ProductCustomFieldValues", "Product.ProductCustomFieldValues.ProductCustomField" })
                .OrderByDescending(x => x.Id)
                            .Select(x => new ProductListForHomeDto
                            {
                                Id = x.Id,
                                Abstract = x.Product.Abstract,
                                Title = x.Product.Title,
                                Image = x.Product.Image.BindImage(),
                                IsSpecial = x.Product.IsSpecial,
                                Date = x.CreatedDate.RelativeDate().toPersianNumber(),
                                Url = x.Product.Url,
                                Values = x.Product.ProductCustomFieldValues.Where(x => x.ProductCustomField.ShowInList).Select(x => new ProductCustomFields
                                {
                                    Key = x.ProductCustomField.Key,
                                    Name = x.ProductCustomField.Name,
                                    Value = x.PersianValue.toPersianNumber()
                                }).ToList()

                            }).ToListAsync();
            return new ListResultViewModel<IEnumerable<ProductListForHomeDto>>
            {
                model = result,
                Message = SuccessfullMessage,
                NotificationType = NotificationType.success,
                Status = Status.Success
            };
        }
        public async Task<ListResultViewModel<IEnumerable<ProductListForHomeDto>>> GetProductList(
            long? maincategoryId = null,
            long[] categoryIds = null,
            long? subcategoryId = null,
            long[] brandIds = null,
            long[] optionIds = null,
            string title = null,
            string order = null,
            int page = 1,
            int pageSize = 10,
            long? ownerId = null)
        {


            var strQuery = PredicateBuilder.True<tbl_Product>();
            if (maincategoryId != null)
            {
                strQuery = strQuery.And(y => y.MainProductCategoryId == maincategoryId);
            }
            if (categoryIds != null && categoryIds.Any())
            {
                var m = PredicateBuilder.False<tbl_Product>();

                foreach (var item in categoryIds)
                {
                    m = m.Or(y => y.ProductCategoryId == item);

                }
                strQuery = strQuery.And(m);
            }
            if (optionIds != null && optionIds.Any())
            {
                var m = PredicateBuilder.False<tbl_Product>();

                foreach (var item in optionIds)
                {
                    m = m.Or(y => y.ProductCustomFieldValues.Any(h=>h.ProductCustomFieldsOptionValueId==item));

                }
                strQuery = strQuery.And(m);
            }
            if (subcategoryId != null)
            {
                strQuery = strQuery.And(y => y.SubProductCategoryId == subcategoryId);
            }
            if (brandIds != null && brandIds.Any())
            {
                var m = PredicateBuilder.False<tbl_Product>();

                foreach (var item in brandIds)
                {
                    m = m.Or(y => y.BrandId == item);

                }
                strQuery = strQuery.And(m);
            }
            if (!string.IsNullOrEmpty(title))
            {
                strQuery = strQuery.And(y => y.Title.Contains(title));
            }
            if (ownerId != null)
            {
                strQuery = strQuery.And(x => x.OwnerId == ownerId);
            }
            if (ownerId == null)
            {
                strQuery = strQuery.And(x => x.State == ProductState.ACTIVED);
            }
            var result = _db.GetAllAsync<tbl_Product>(strQuery, new string[] { "Image", "ProductCustomFieldValues", "ProductCustomFieldValues.ProductCustomField", "ProductPriceHistories" })
                .Select(x => new ProductListForHomeDto
                {
                    Id = x.Id,
                    Abstract = x.Abstract,
                    Title = x.Title,
                    Image = x.Image.BindImage(),
                    IsSpecial = x.IsSpecial,
                    Date = x.CreatedDate.RelativeDate().toPersianNumber(),
                    Url = x.Url,
                    State = x.State.ToString(),
                    Values = x.ProductCustomFieldValues.Where(x => x.ProductCustomField.ShowInList).Select(x => new ProductCustomFields
                    {
                        Key = x.ProductCustomField.Key,
                        Name = x.ProductCustomField.Name,
                        Value = x.PersianValue.toPersianNumber()
                    }).ToList(),
                    Cost=x.GetLastPrice().ToString("n0").toPersianNumber(),
                    Discount=x.GetDiscountPrice() !=null?x.GetDiscountPrice().Value.ToString("n0").toPersianNumber():null,
                    Call=x.GetLastPrice()==0

                });

            if (order == EnumOrder.NEW.ToString())
            {
                result = result.OrderByDescending(x => x.Id);
            }
            if (order == EnumOrder.OLD.ToString())
            {
                result = result.OrderBy(x => x.Id);

            }
            if (order == EnumOrder.Expensive.ToString())
            {
                result = result.OrderByDescending(x => x.Cost);
            }
            if (order == EnumOrder.Chepper.ToString())
            {
                result = result.OrderBy(x => x.Cost);
            }
            var res = await result.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            return new ListResultViewModel<IEnumerable<ProductListForHomeDto>>
            {
                model = res,
                Message = SuccessfullMessage,
                NotificationType = NotificationType.success,
                Status = Status.Success
            };



        }

        public async Task<ListResultViewModel<IEnumerable<GetProductListForAdminDto>>> GetProductListForAdmin(long? brandId)
        {
            try
            {

                var result = (await _db.tbl_Products.Include(x=>x.Image)
                    .Include(x=>x.ProductVisits)
                    .Include(x=>x.ProductComments)
                    .Include(x=>x.ProductPriceHistories)
                    .ThenInclude(x=>x.OrderDetails)
                    .ThenInclude(x=>x.Order)
                    .Include(x=>x.SubProductCategory)
                    .OrderByDescending(x => x.CreatedDate)
                    .Where(x=>brandId !=null?x.BrandId==brandId:true)
                    .ToListAsync())
                    .Select((x, i) => new GetProductListForAdminDto
                    {
                        Row = i + 1,
                        Id = x.Id,
                        Title = x.Title,
                        Image = x.Image.BindImage(),
                        OrderCount = x.ProductPriceHistories.SelectMany(x => x.OrderDetails).Count(h=>h.Order.OrderState==DomainClasses.Entity.Order.OrderState.PAYED),
                        SubCategory = x.SubProductCategory.Title,
                        Status = x.IsActive ? "فعال" : "غیر فعال",
                        Cost = x.GetLastPrice().ToString("n0").toPersianNumber() + " تومان",
                        CommentCount=x.ProductComments.Count(),
                        Visit=x.ProductVisits.Count()
                    });

                return new ListResultViewModel<IEnumerable<GetProductListForAdminDto>>
                {
                    model = result,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<IEnumerable<GetProductListForAdminDto>>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task UpdateImage(long id, long ImageId)
        {
            var pr = await _db.tbl_Products.FindAsync(id);
            pr.ImageId = ImageId;
            await _db.SaveChangesAsync();
        }

        public async Task<ListResultViewModel<bool>> UpdateProductForAdmin(AddProductForAdminDTO model)
        {
            try
            {
                if (!_db.tbl_Products.Any(y => y.Url == model.Url && y.IsDelete != true && y.Id != model.Id))
                {
                    var pr = await _db.tbl_Products.Include(x=>x.ProductCustomFieldValues).FirstOrDefaultAsync(h => h.Id == model.Id);


                    pr.Id = model.Id;
                    pr.Abstract = model.Abstract;
                    pr.Description = model.Description;
                    pr.IsSpecial = model.IsSpecial;
                    pr.Url = model.Url;
                    pr.Title = model.Title;
                    pr.SubProductCategoryId = model.SubProductCategoryId;
                    pr.PageTitle = model.PageTitle;
                    pr.MetaKeyword = model.MetaKeyword;
                    pr.ImageId = model.ImageId;
                    pr.MetaDescription = model.MetaDescription;
                    pr.BrandId = model.BrandId;
                    pr.EnTitle = model.EnTitle;
                    pr.MainProductCategoryId = model.MainProuctCategoryId;
                    pr.ProductCategoryId = model.ProductCategoryId;
                    pr.State = ProductState.ACTIVED;

                    if (model.Values != null)
                    {
                        model.Values.ForEach(h =>
                        {
                            var k = pr.ProductCustomFieldValues.FirstOrDefault(f => f.ProductCustomFieldId == h.FieldId && f.ProductId == model.Id);
                            if (k != null)
                            {
                                k.Value = h.Value;
                                k.ProductCustomFieldsOptionValueId = h.OptionId;
                            }
                            else
                            {
                                if (h.Value != null || h.OptionId != null)
                                {
                                    k = new tbl_ProductCustomFieldValues
                                    {
                                        Value = h.Value,
                                        ProductCustomFieldsOptionValueId = h.OptionId,
                                        ProductCustomFieldId = h.FieldId,
                                    };
                                    pr.ProductCustomFieldValues.Add(k);
                                }
                            }

                        });
                    }
                    else
                    {
                        pr.ProductCustomFieldValues.Clear();
                    }
                    _db.UpdateBaseEntity<tbl_Product>(pr);
                    await _db.SaveChangesAsync();
                    return new ListResultViewModel<bool>
                    {
                        model = true,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<bool>
                {
                    model = false,
                    Message = "محتوای آدرس تکراری می باشد",
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<bool>
                {
                    Message = FailMessage,
                    model = false,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<tbl_Product> Find(long id)
        {
            return await _db.tbl_Products.FindAsync(id);
        }

        public async Task<bool> AddToFavorite(long id, long userId)
        {
            var product = await _db.tbl_Products.Include(x => x.Users).FirstOrDefaultAsync(x => x.Id == id);

            var user = await _db.tbl_Users.FindAsync(userId);
            if (product.Users.Any(x => x.Id == userId))
            {
                product.Users.Remove(user);
                await _db.SaveChangesAsync();
                return false;

            }
            else
            {
                product.Users.Add(user);
                await _db.SaveChangesAsync();

                return true;

            }

        }

        public async Task<bool> AddProductVisit(long id, long userId)
        {
            if (!_db.tbl_ProductVisits.Any(x => x.ProductId == id && x.UserId == userId))
            {
                await _db.tbl_ProductVisits.AddAsync(new tbl_ProductVisits
                {
                    ProductId = id,
                    UserId = userId
                });
                await _db.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<object> GetChartData(string id)
        {
            var data = await _db.tbl_ProductVisits.Include(x => x.Product).Where(x => x.Product.Url == id).OrderByDescending(x => x.CreatedDate).ToListAsync();

            var group = data.GroupBy(x => x.CreatedDate.Date).Take(7).Reverse();
            var labels = group.Select(x => x.Key.ConvertToPesainDate().toPersianNumber());
            var list = group.Select(x => x.Count());
            return new
            {
                Data = list,
                Labels = labels,
                total = data.Count().ToString().toPersianNumber(),
                Max = list.Any() ? list.Max() : 0
            };
        }

        public async Task<ListResultViewModel<IEnumerable<object>>> GetLastVisitCategoryList(long userId)
        {
            var list = (await _db.tbl_ProductVisits
                .Include(x => x.Product)
                .ThenInclude(x => x.SubProductCategory)
                .ThenInclude(x => x.ProductCategory)
                .Where(x => x.UserId == userId)
                .ToListAsync())
                .GroupBy(x => x.ProductId)
                .Select(x => new
                {
                    Category = x.FirstOrDefault().Product.GetCategoryData()
                });
            return new ListResultViewModel<IEnumerable<object>>
            {
                Message = SuccessfullMessage,
                model = list,
                NotificationType = NotificationType.success,
                Status = Status.Success
            };
        }

        public async Task<ListResultViewModel<object>> Search(string name)
        {
            var data = await _db.tbl_Products
                .Where(x => x.Title.Contains(name))
                .Select(x => new
                {
                    Id=x.Id,
                    Title = x.Title,
                    Image = x.Image.BindImage(),
                    Url=x.Url,
                    Category=new
                    {
                       Id= x.SubProductCategoryId,
                       Title= x.SubProductCategory.Title,
                       Url= x.SubProductCategory.Url,
                    }
                    
                })
                .ToListAsync();

            return new ListResultViewModel<object>
            {
                Message = SuccessfullMessage,
                model = data,
                NotificationType = NotificationType.success,
                Status = Status.Success
            };
        }
    }
}
