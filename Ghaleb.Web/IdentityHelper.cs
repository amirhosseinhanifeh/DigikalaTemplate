using ALO.Common.Utilities.ConvertTo;
using System.Security.Claims;
using System.Security.Principal;

namespace Ghaleb.Web.Helpers
{
    public static class IdentityHelper
    {

        public static long? UserId(this ClaimsPrincipal identity)
        {
            var s = identity.FindFirst("Id");
            if (s != null)
            {
                return s.Value.Tolong();

            }
            return null;
        }
    }
}
