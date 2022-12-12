using Newtonsoft.Json;

namespace ALO.ViewModels.Result
{
    public class ImageReturnViewModel
    {
        //[JsonIgnore]
        //public string Host { get; set; } = "http://api.mozer-co.com/";
        [JsonIgnore]
        public string Host { get; set; } = "http://192.168.43.215/";
        [JsonIgnore]
        public string Url { get; set; } = "Uploads/";
        [JsonIgnore]
        public string Image { get; set; }
        public string ImageUrl
        {
            get { return Host + Url + Image; }
            set
            {

            }
        }
    }
}
