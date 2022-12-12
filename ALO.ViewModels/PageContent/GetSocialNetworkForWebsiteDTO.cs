using ALO.DomainClasses.Entity.Content;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.ViewModels.PageContent
{
    public class GetInfoTopHeaderForWebsiteDTO
    {
        public string Tel { get; set; }
        public string Email { get; set; }
        public List<GetSocialNetworkForWebsiteDTO> socials { get; set; }
    }
    public class GetSocialNetworkForWebsiteDTO
    {
        public string Url { get; set; }
        public string Social { get; set; }
        public string Icon { get; set; }
    }
}
