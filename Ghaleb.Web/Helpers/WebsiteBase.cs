using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.Language;


namespace Ghaleb.Web.Helpers
{
    public class WebsiteBase
    {
        private readonly ServiceContext _context;
        private readonly CookieHelper _cookieHelper;

        public WebsiteBase(ServiceContext context,
            CookieHelper cookieHelper)
        {
            _context = context;
            _cookieHelper = cookieHelper;
        }
        public string GetCurrectLanguageCodeAsync
        {
            get
            {
                var Name = _cookieHelper.Read<long?>("Lan") != null ? _context.GetAsync<tbl_Language>(x => x.Id == _cookieHelper.Read<long?>("Lan")).Result.LanguageCode : "fa";
                return Name;
            }
            set { }

        }
        public string GetCurrectLanguageNameAsync
        {
            get
            {
                var Name = _cookieHelper.Read<long?>("Lan") != null ? _context.GetAsync<tbl_Language>(x => x.Id == _cookieHelper.Read<long?>("Lan")).Result.Name : _context.GetAsync<tbl_Language>(x => x.LanguageCode == "fa").Result.Name;
                return Name;
            }
            set { }

        }
        public long? GetCurrectLanguageIdAsync
        {
            get
            {
                var Id = _cookieHelper.Read<long?>("Lan") != null ? _cookieHelper.Read<long?>("Lan") : _context.GetAsync<tbl_Language>(x => x.LanguageCode == "fa").Result.Id;
                return Id;
            }
            set { }

        }
    }
}
