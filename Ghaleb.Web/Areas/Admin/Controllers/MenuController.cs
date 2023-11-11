using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Menu;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public MenuController(ServiceContext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return PartialView();
        }
        public async Task<IActionResult> List(long? parentId = null)
        {
            return View(await _context.tbl_Menus.Where(x => x.ParentId == parentId).ToListAsync());
        }
        [HttpPost]
        public async Task<IActionResult> List()
        {
            if (!_context.tbl_Menus.Any())
            {
                var list = new List<tbl_Menu>(){
             new tbl_Menu
            {
                Name = "داشبورد",
                Link = "/admin",
                Order = 1,
                ParentId = null
            },
                           new tbl_Menu
                           {
                               Name = "مدیریت کاربران",
                               Link = "#",
                               Order = 2,
                               ParentId = null,
                               ChildMenus = new List<tbl_Menu>()
                           {
                    new tbl_Menu
                    {
                        Name="کاربران سایت",
                        Link="/Admin/Users/Index",
                        Order=1,
                        ParentId=2,

                    },
                     new tbl_Menu
                    {
                        Name="مدیریت نقش ها",
                        Link="/Admin/Roles/Index",
                        Order=2,
                        ParentId=2,
                    }
                           }
                           },
           new tbl_Menu
           {
               Name = "مدیریت وبلاگ",
               Link = "#",
               Order = 3,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new tbl_Menu
                    {
                        Name="لیست وبلاگ",
                        Link="/Admin/Blog/Index",
                        Order=1,
                        ParentId=3

                    },
                     new tbl_Menu
                    {
                        Name="مدیریت نظرات",
                        Link="/Admin/BlogComment/Index",
                        Order=2,
                        ParentId=3

                    }
                           }
           },
           new tbl_Menu
           {
               Name = "مدیریت محصولات",
               Link = "#",
               Order = 4,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new tbl_Menu
                    {
                        Name="لیست محصولات",
                        Link="/Admin/Product/Index",
                        Order=1,
                        ParentId =4
                    },
                     new tbl_Menu
                    {
                        Name="گروه محصولات",
                        Link="/Admin/ProductCategory/Index",
                        Order=2,
                        ParentId =4

                    },

                     new tbl_Menu
                    {
                        Name="مدیریت نظرات",
                        Link="/Admin/ProductComment/Index",
                        Order=3,
                        ParentId =4

                    }
                     ,
                     new tbl_Menu
                    {
                        Name="زیر دسته محصولات",
                        Link="/Admin/ProductSubCategory/Index",
                        Order=4,
                        ParentId =4

                    }
                     ,
                     new tbl_Menu
                    {
                        Name="مدیریت برند ها",
                        Link="/Admin/Brand/Index",
                        Order=5,
                        ParentId =4

                    }
                           }
           },
           new tbl_Menu
           {
               Name = "محتوای سایت",
               Link = "#",
               Order = 5,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new tbl_Menu
                    {
                        Name="مدیریت صفحات متنی",
                        Link="/Admin/PageContent/Index",
                        Order=1,
                        ParentId =5

                    },
                     new tbl_Menu
                    {
                        Name="مدیریت تماس با ما",
                        Link="/Admin/ContactUs/Index",
                        Order=2,
                        ParentId =5

                    },

                     new tbl_Menu
                    {
                        Name="مدیریت شبکه های اجتماعی",
                        Link="/Admin/SocialNetwork/Index",
                        Order=3,
                        ParentId =5

                    }
                     ,
                     new tbl_Menu
                    {
                        Name="مدیریت سئو صفحه اول",
                        Link="/Admin/Seo/Index",
                        Order=4,
                        ParentId =5

                    }
                     ,
                     new tbl_Menu
                    {
                        Name="مدیریت بلوک ها",
                        Link="/Admin/Block/Index",
                        Order=5,
                        ParentId =5

                    }
                      ,
                     new tbl_Menu
                    {
                        Name="مدیریت اسلایدشو",
                        Link="/Admin/SlideShow/Index",
                        Order=6,
                        ParentId =5

                    } ,
                     new tbl_Menu
                    {
                        Name="مدیریت ابزار ها",
                        Link="/Admin/Tool/Index",
                        Order=7,
                        ParentId =5

                    }
                           }
           }
           ,
           new tbl_Menu
           {
               Name = "مدیریت فرم ها",
               Link = "#",
               Order = 6,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new tbl_Menu
                    {
                        Name="مدیریت فرم تماس با ما",
                        Link="/Admin/FormContactUs/Index",
                        Order=1,
                        ParentId =6

                    }
                           }
           },
           new tbl_Menu
           {
               Name = "مدیریت سفارشات",
               Link = "#",
               Order = 7,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new tbl_Menu
                    {
                        Name="لیست سفارشات",
                        Link="/Admin/Order/Index",
                        Order=1,
                        ParentId =7

                    }
                           }
           },
           new tbl_Menu
           {
               Name = "مدیریت لینک",
               Link = "#",
               Order = 8,
               ParentId = null,
               ChildMenus = new List<tbl_Menu>()
                           {
                    new tbl_Menu
                    {
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
        public async Task<IActionResult> Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(tbl_Menu model)
        {
            await _context.tbl_Menus.AddAsync(model);
            await _context.SaveChangesAsync();
            return RedirectToAction("List");
        }
    }
}
