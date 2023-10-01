using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.IMG;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class MediaModel : PageModel
    {
        private readonly ServiceContext _serviceContext;

        public MediaModel(ServiceContext serviceContext)
        {
            _serviceContext = serviceContext;
        }
        public List<tbl_Image> Videoes { get; set; }
        public tbl_Image Video { get; set; }
        public async Task OnGet(long? id)
        {
            Videoes = await _serviceContext.tbl_Image.Include(x=>x.VideoDetail).Where(x => x.FileType == FileType.Video).ToListAsync();
            if (Videoes.Any())
            {
                if (id == null)
                {
                    id = Videoes.FirstOrDefault().Id;
                }
                Video = await _serviceContext.tbl_Image.Include(x=>x.VideoDetail).FirstOrDefaultAsync(x => x.Id == id);
            }
        }
    }
}
