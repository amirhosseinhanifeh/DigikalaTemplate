using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.Product;
using Ghaleb.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages.Profile
{
    [Authorize]
    public class FavouritesModel : PageModel
    {
		private readonly ServiceContext _context;

		public FavouritesModel(ServiceContext context)
		{
			_context = context;
		}
		public List<tbl_Product> UserFavourite { get; set; }
		public async Task OnGet()
        {
			UserFavourite = await _context.tbl_Users.Include(x=>x.Products).ThenInclude(x=>x.Image).Where(x=>x.Id==User.UserId()).SelectMany(h => h.Products).ToListAsync();
        }
		public async Task<IActionResult> OnGetAddToFavorite(long prId)
		{
			var product = await _context.tbl_Products.Include(x => x.Users).FirstOrDefaultAsync(x => x.Id == prId);
			if (product.Users.Any(h => h.Id == User.UserId()))
			{
				var pu = product.Users.FirstOrDefault(h => h.Id == User.UserId());
				product.Users.Remove(pu);
			}
			else
			{
				var user = await _context.tbl_Users.FindAsync(User.UserId());
				product.Users.Add(user);
			}
			await _context.SaveChangesAsync();

			return Redirect("/Profile/Favourites");

		}
	}
}
