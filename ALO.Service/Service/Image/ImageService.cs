using ALO.Service.Interface.Image;
using ALO.ViewModels.Result;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using ALO.Common.Enums;
using static ALO.Common.Messages.Message;
using ALO.DomainClasses.Entity.IMG;
using ALO.DataAccessLayer.DataContext;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Webp;
using Microsoft.AspNetCore.Http.Internal;

namespace ALO.Service.Service.ImageService
{
    public class ImageService : IImageService
    {
        private readonly IHostingEnvironment _webHostEnvironment;
        private readonly ServiceContext _db;
        public ImageService(IHostingEnvironment webHostEnvironment,
            ServiceContext db)
        {
            _webHostEnvironment = webHostEnvironment;
            _db = db;
        }
        public async Task<ListResultViewModel<tbl_Image>> CreateAsync(string file)
        {
            try
            {
                if (file != null)
                {
                    tbl_Image img = new tbl_Image()
                    {
                        Url = null,
                        Image_thumb = file,
                    };
                    var result = _db.Create(img);
                    await _db.SaveChangesAsync();
                    return new ListResultViewModel<tbl_Image>
                    {
                        model = result,
                        Message = SuccessfullMessage,
                        NotificationType = NotificationType.success,
                        Status = Status.Success
                    };
                }
                return new ListResultViewModel<tbl_Image>
                {
                    model = null,
                    Message = SuccessfullMessage,
                    NotificationType = NotificationType.success,
                    Status = Status.Success
                };
            }
            catch (Exception e)
            {
                return new ListResultViewModel<tbl_Image>
                {
                    Message = FailMessage,
                    model = null,
                    NotificationType = NotificationType.error,
                    Status = Status.Failed
                };
            }
        }
        public FormFile ConvertByteToFile(byte[] byteArray,string name)
        {
            using (var stream = new MemoryStream(byteArray))
            {
                var file = new FormFile(stream, 0, byteArray.Length, name, name)
                {
                    Headers = new HeaderDictionary(),
                    ContentType = "image/jpeg",
                };

                System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
                {
                    FileName = file.FileName
                };
                file.ContentDisposition = cd.ToString();

                if (file != null)
                {
                    return file;
                }
            }
            return null;
        }
        public async Task<ListResultViewModel<string>> UploadAsync(IFormFile file, string name)
        {
            try
            {
                if (file != null)
                {
                    if (file.Length > 0)
                    {
                        string data = null;
                        using (var ms = new MemoryStream())
                        {
                            using (var image = Image.Load(file.OpenReadStream()))
                            {

                                image.Mutate(
       i => i.Resize(image.Width/2, image.Height/2));
                                var encoder = new WebpEncoder()
                                {
                                    Quality = 30,
                                    
                                    
                                };
                                image.SaveAsWebp("wwwroot/Uploads/Images/"+name + ".webp",encoder);
                                data = name + ".webp";
                                // act on the Base64 data
                            }
                        }


                        return new ListResultViewModel<string>
                        {
                            model = data,
                            Message = SuccessfullMessage,
                            NotificationType = NotificationType.success,
                            Status = Status.Success
                        };
                    }
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
