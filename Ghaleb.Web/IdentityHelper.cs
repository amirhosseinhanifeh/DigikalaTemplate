using ALO.Common.Utilities.ConvertTo;
using System.Security.Claims;
using System.Security.Principal;

namespace Ghaleb.API.Helpers
{
    public static class IdentityHelper
    {

        public static long UserId(this ClaimsPrincipal identity)
        {
            return identity.FindFirst("Id").Value.Tolong().Value;
        }
    }
}
