using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.EntityHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Ghaleb.Web.Pages.Checkout
{
    public class BasketModel : PageModel
    {
        private readonly ServiceContext _context;

        public BasketModel(ServiceContext context)
        {
            _context = context;
        }

        public List<ResponseGetBasketItems> List { get; set; } = new List<ResponseGetBasketItems>();

        public async Task OnGet()
        {
            var res = Request.Cookies["basket"];
            if (res == null)
                return;
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);
            foreach (var item in list)
            {

                var pr = await _context.tbl_ProductPriceHistory.Include(x=>x.Color).Include(x => x.Product).ThenInclude(x => x.Image).FirstOrDefaultAsync(x => x.Id == item.Id);

                List.Add(new ResponseGetBasketItems
                {
                    Count = item.Count,
                    Price = pr.GetPrice(),
                    Id = item.Id,
                    Image = pr.Product.Image.BindImage(),
                    Name = pr.Product.Title + "("+pr.Color.Name+")",
                    TotalPrice = pr.GetPrice() * item.Count
                });
            }

        }
        public async Task<IActionResult> OnGetDelete(long id)
        {
            var res = Request.Cookies["basket"];
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);

            var item = list.FirstOrDefault(h => h.Id == id);
            list.Remove(item);
            Response.Cookies.Append("basket", JsonConvert.SerializeObject(list));
            return RedirectToPage("Basket");
        }
        public async Task<IActionResult> OnPostUpdateCount(ResonseBasketDTO[] model)
        {
            var res = Request.Cookies["basket"];
            var list = JsonConvert.DeserializeObject<List<ResonseBasketDTO>>(res);
            foreach (var item in model)
            {
                item.Count = item.Count == 0 || item.Count<0 ? 1 : item.Count;
                var item3 = list.FirstOrDefault(h => h.Id == item.Id);
                item3.Count = item.Count;

            }
            Response.Cookies.Append("basket", JsonConvert.SerializeObject(list));
            return RedirectToPage("Basket");
        }
        public async Task<IActionResult> OnPost()
        {
            return RedirectToPage("/checkout/address");
        }
    }
    public class ResonseBasketDTO
    {
        public long Id { get; set; }
        public int Count { get; set; }
    }
    public class ResponseGetBasketItems
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
