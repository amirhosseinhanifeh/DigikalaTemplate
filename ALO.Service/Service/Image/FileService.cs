using ALO.Service.Interface.Image;
using ALO.ViewModels.Result;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ALO.Common.Enums;
using static ALO.Common.Messages.Message;
using ALO.DomainClasses.Entity.IMG;
using ALO.DataAccessLayer.DataContext;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace ALO.Service.Service.ImageService
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ServiceContext _db;
        public FileService(IWebHostEnvironment webHostEnvironment,
            ServiceContext db)
        {
            _webHostEnvironment = webHostEnvironment;
            _db = db;
        }
        public async Task<ListResultViewModel<tbl_File>> CreateAsync(string File)
        {
            try
            {
                if (!string.IsNullOrEmpty(File))
                {
                    tbl_File img = new tbl_File()
                    {
                        Url = File,
                    };
                    var result = _db.Create(img);
                    await _db.SaveChangesAsync();
                    return new ListResultViewModel<tbl_File>
                    {
                        model = result,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<tbl_File>
                {
                    model = null,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<tbl_File>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }

        public async Task<ListResultViewModel<string>> UploadAsync(IFormFile file, string folder)
        {
            try
            {
                if (file != null)
                {
                    if (file.Length > 0)
                    {
                        var filePath = GetPathAndFilename(file.FileName, folder);
                        if(!System.IO.File.Exists(GetPath(folder)))
                        {
                            Directory.CreateDirectory(GetPath(folder));
                        }
                        using (var stream = System.IO.File.Create(filePath))
                        {
                            await file.CopyToAsync(stream);
                        }
                    }
                    return new ListResultViewModel<string>
                    {
                        model = $"/Uploads/{folder}/{file.FileName}",
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<string>
                {
                    model = null,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<string>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);

            return filename;
        }

        private string GetPathAndFilename(string filename, string folder)
        {
            return this._webHostEnvironment.WebRootPath + "\\Uploads\\" + folder + "\\" + filename;
        }
        private string GetPath(string folder)
        {
            return this._webHostEnvironment.WebRootPath + "\\Uploads\\" + folder;
        }
    }
}
