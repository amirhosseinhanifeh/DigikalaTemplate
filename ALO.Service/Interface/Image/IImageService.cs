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
        Task<ListResultViewModel<tbl_Image>> CreateAsync(string File,long? Id=null);
        Task<ListResultViewModel<string>> UploadAsync(IFormFile file,string name=null);
        FormFile ConvertByteToFile(byte[] byteArray, string name);
    }
}
