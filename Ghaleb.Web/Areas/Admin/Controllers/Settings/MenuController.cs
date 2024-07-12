using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Menu;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ghaleb.API.Areas.Admin.Controllers
{
    [Area("Admin")]

    public class MenuController : Controller
    {
        private readonly ServiceContext _context;
        private readonly IMemoryCache _memoryCache;
        public MenuController(ServiceContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }
        public async Task<IActionResult> Index()
        {
            return PartialView();
        }
        public async Task<IActionResult> List(long? parentId = null)
        {
            return View(await _context.tbl_Menus.AsNoTracking().Include(x => x.ChildMenus).Where(x => x.ParentId == parentId).ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> List()
        {
            if (!_context.tbl_Menus.Any())
            {
                var list = new List<tbl_Menu>(){
             new() {
                Name = "داشبورد",
                Link = "/admin",
                Order = 1,
                ParentId = null
            },
                           new() {
                               Name = "مدیریت کاربران",
                               Link = "#",
                               Order = 2,
                               ParentId = null,
                               ChildMenus = new List<tbl_Menu>()
                           {
                    new() {
                        Name="کاربران سایت",
                        Link="/Admin/Users/Index",
                        Order=1,
                        ParentId=2,

                    },
                     new() {
                        Name="مدیریت نقش ها",
                        Link="/Admin/Roles/Index",
                        Order=2,
                        ParentId=2,
                    }
                           }
                           },
           new() {
               Name = "مدیریت وبلاگ",
               Link = "#",
               Order = 3,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new() {
                        Name="لیست وبلاگ",
                        Link="/Admin/Blog/Index",
                        Order=1,
                        ParentId=3

                    },
                     new() {
                        Name="مدیریت نظرات",
                        Link="/Admin/BlogComment/Index",
                        Order=2,
                        ParentId=3

                    }
                           }
           },
           new() {
               Name = "مدیریت محصولات",
               Link = "#",
               Order = 4,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new() {
                        Name="لیست محصولات",
                        Link="/Admin/Product/Index",
                        Order=1,
                        ParentId =4
                    },
                     new() {
                        Name="گروه محصولات",
                        Link="/Admin/ProductCategory/Index",
                        Order=2,
                        ParentId =4

                    },

                     new() {
                        Name="مدیریت نظرات",
                        Link="/Admin/ProductComment/Index",
                        Order=3,
                        ParentId =4

                    }
                     ,
                     new() {
                        Name="زیر دسته محصولات",
                        Link="/Admin/ProductSubCategory/Index",
                        Order=4,
                        ParentId =4

                    }
                     ,
                     new() {
                        Name="مدیریت برند ها",
                        Link="/Admin/Brand/Index",
                        Order=5,
                        ParentId =4

                    }
                           }
           },
           new() {
               Name = "محتوای سایت",
               Link = "#",
               Order = 5,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new() {
                        Name="مدیریت صفحات متنی",
                        Link="/Admin/PageContent/Index",
                        Order=1,
                        ParentId =5

                    },
                     new() {
                        Name="مدیریت تماس با ما",
                        Link="/Admin/ContactUs/Index",
                        Order=2,
                        ParentId =5

                    },

                     new() {
                        Name="مدیریت شبکه های اجتماعی",
                        Link="/Admin/SocialNetwork/Index",
                        Order=3,
                        ParentId =5

                    }
                     ,
                     new() {
                        Name="مدیریت سئو صفحه اول",
                        Link="/Admin/Seo/Index",
                        Order=4,
                        ParentId =5

                    }
                     ,
                     new() {
                        Name="مدیریت بلوک ها",
                        Link="/Admin/Block/Index",
                        Order=5,
                        ParentId =5

                    }
                      ,
                     new() {
                        Name="مدیریت اسلایدشو",
                        Link="/Admin/SlideShow/Index",
                        Order=6,
                        ParentId =5

                    } ,
                     new() {
                        Name="مدیریت ابزار ها",
                        Link="/Admin/Tool/Index",
                        Order=7,
                        ParentId =5

                    }
                           }
           }
           ,
           new() {
               Name = "مدیریت فرم ها",
               Link = "#",
               Order = 6,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new() {
                        Name="مدیریت فرم تماس با ما",
                        Link="/Admin/FormContactUs/Index",
                        Order=1,
                        ParentId =6

                    }
                           }
           },
           new() {
               Name = "مدیریت سفارشات",
               Link = "#",
               Order = 7,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new() {
                        Name="لیست سفارشات",
                        Link="/Admin/Order/Index",
                        Order=1,
                        ParentId =7

                    }
                           }
           },
           new() {
               Name = "مدیریت لینک",
               Link = "#",
               Order = 8,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new() {
                        Name="مدیریت لینک ها",
                        Link="/Admin/GroupLinkManagement/Index",
                        Order=1,
                        ParentId =8

                    }
                           }
           }
         };
                await _context.tbl_Menus.AddRangeAsync(list);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction("List");
        }
        public async Task<IActionResult> Create(long? Id, long? ParentId)
        {
            ViewBag.ParentId = ParentId;
            return View(await _context.tbl_Menus.FirstOrDefaultAsync(x => x.Id == Id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(long? Id, tbl_Menu model)
        {
            if (Id != null)
            {
                var menu = await _context.tbl_Menus.FirstOrDefaultAsync(x => x.Id == Id);
                menu.Order = model.Order;
                menu.Name = model.Name;
                menu.Link = model.Link;

            }
            else
            {
                await _context.tbl_Menus.AddAsync(model);

            }
            await _context.SaveChangesAsync();
            return RedirectToAction("List");
        }
        public async Task<IActionResult> ClearCache()
        {
            _memoryCache.Remove("Menu");
            return RedirectToAction("List");
        }
    }
}
