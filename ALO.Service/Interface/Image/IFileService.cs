using ALO.DomainClasses.Entity.IMG;
using ALO.ViewModels.Result;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ALO.Service.Interface.Image
{
    public interface IFileService
    {
        Task<ListResultViewModel<tbl_File>> CreateAsync(string File);
        Task<ListResultViewModel<string>> UploadAsync(IFormFile file,string content);
    }
}
