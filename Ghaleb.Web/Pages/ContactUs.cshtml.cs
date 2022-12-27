using ALO.Common.Enums;
using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Content;
using ALO.Service.Interface.Forms;
using ALO.Service.Interface.PageContent;
using ALO.ViewModels.Forms;
using ALO.ViewModels.PageContent;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Ghaleb.Web.Pages
{
    public class ContactUsModel : PageModel
    {
        private readonly IFormContactUsService _frmcontact;
        private readonly IContactUsService _contact;
        private readonly ServiceContext _context;
        public ContactUsModel(IFormContactUsService frmcontact, IContactUsService contact, ServiceContext context)
        {
            _frmcontact = frmcontact;
            _contact = contact;
            _context = context;
        }
        public ContactUsDetailsDTO ContactUs { get; set; }
        public tbl_PageContent Seo { get; set; }
        public async Task OnGetAsync()
        {
            ContactUs = (await _contact.Get()).model;
            Seo = await _context.tbl_PageContent.FirstOrDefaultAsync(x => x.Url == "contact-us");
        }
        public string Message { get; set; }
        public async Task OnPostAsync(FormContactUsDTO model)
        {

            var result = await _frmcontact.CreateAsync(model);

            Message = result.Message;
            ContactUs = (await _contact.Get()).model;
            Seo = await _context.tbl_PageContent.FirstOrDefaultAsync(x => x.Url == "contact-us");
        }
    }
}
