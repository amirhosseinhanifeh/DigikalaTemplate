using Newtonsoft.Json;

namespace Ghaleb.Web.Helpers
{
    public class CookieHelper
    {
        private IHttpContextAccessor _httpContextAccessor;

        public CookieHelper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void SetCookie(string Key, object value)
        {

            _httpContextAccessor.HttpContext.Response.Cookies.Append(Key, JsonConvert.SerializeObject(value), new CookieOptions
            {
                Expires = DateTime.Now.AddYears(1),
                Secure = true,

            });
        }
        public T Read<T>(string key)
        {
            var data = _httpContextAccessor.HttpContext.Request.Cookies[key];
            if (data != null)
                return JsonConvert.DeserializeObject<T>(data);
            return default;
        }
    }
}
