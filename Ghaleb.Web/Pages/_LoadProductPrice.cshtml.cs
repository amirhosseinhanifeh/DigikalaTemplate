
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Ghaleb.Web.Pages
{
    public class _LoadProductPriceModel : PageModel
    {
        private readonly ServiceContext _context;

        public _LoadProductPriceModel(ServiceContext context)
        {
            _context = context;
        }

        public tbl_ProductPriceHistory Price { get; set; }
        public async Task OnGetAsync(long Id, long? colorId)
        {
            var data = await _context.tbl_ProductPriceHistory.AsNoTracking().Include(x => x.Product).Where(x => x.ProductId == Id && (colorId != null ? x.ColorId == colorId : true)).FirstOrDefaultAsync();
            Price = data;
        }
        public async Task<IActionResult> OnPostAddToBasket(long id)
        {
            var list = GetBasket();
            if (list == null)
            {
                list = new List<ResponseBasketDTO>();
            }
            var item = list.FirstOrDefault(x => x.Id == id);
            if (item !=null)
            {
                item.Count = item.Count + 1;
            }
            else
                list.Add(new ResponseBasketDTO
                {
                    Id = id,
                    Count = 1
                });
            var cookieOptions = new CookieOptions();
            Response.Cookies.Append("basket", JsonConvert.SerializeObject(list), cookieOptions);
            return RedirectToPage("/checkout/basket");
        }
        public List<ResponseBasketDTO> GetBasket()
        {
            var res = Request.Cookies["basket"];
            if (res != null)
            {
                return JsonConvert.DeserializeObject<List<ResponseBasketDTO>>(res);
            }
            return null;
        }
    }
    public class ResponseBasketDTO
    {
        public long Id { get; set; }
        public int Count { get; set; }
    }
}
