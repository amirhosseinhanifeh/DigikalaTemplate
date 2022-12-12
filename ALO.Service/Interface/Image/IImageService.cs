using ALO.DomainClasses.Entity.IMG;
using ALO.ViewModels.Result;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Image
{
    public interface IImageService
    {
        Task<ListResultViewModel<tbl_Image>> CreateAsync(string File);
        Task<ListResultViewModel<string>> UploadAsync(IFormFile file,string name);
        FormFile ConvertByteToFile(byte[] byteArray, string name);
    }
}
