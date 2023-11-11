using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.IMG;
using ALO.DomainClasses.EntityHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text;

namespace Ghaleb.Web.Helpers.TagHelpers
{
    [HtmlTargetElement("image-upload")]
    public class ImageUploaderTagHelper : TagHelper
    {
        private readonly ServiceContext _context;
        private readonly IConfiguration _configuration;
        public ImageUploaderTagHelper(ServiceContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public ModelExpression For { get; set; }
        public bool Multiple { get; set; }
        public string Id { get; set; }
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            tbl_Image result = null;
            if (For.Model != null)
            {
                result = _context.GetAsync<tbl_Image>(x => x.Id == (long)For.Model).Result;
            }
            output.Content.AppendHtml($"<div>\r\n" +
                $"<div action=\"/Admin/Upload/UploadImage\" class=\"dropzone needsclick dz-clickable uploader-" + For.Name + "\" >\r\n" +
                $"<div class=\"dz-message needsclick\">\r\nعکس را بکشید<br>\r\n</div>\r\n</div>" +
                $"\r\n" +
                $"</div>");
            string ss = null;
            if (For.Model == null)
            {
                ss = $@"<script type=text/javascript>" +
   "Dropzone.autoDiscover = false;" +
"    $(document).ready(function () {\r\n        //Simple Dropzonejs\r\n        $(\".uploader-" + For.Name + "\").dropzone({\r\n           " +


"  url: \"/Admin/Upload/UploadImage\",\r\n          " +
"  addRemoveLinks: true,\r\n          " +
"  maxFiles: 1,\r\n         " +
"   maxfilesexceeded: function (file) {\r\n          " +
"      this.removeAllFiles();\r\n             " +
"   this.addFile(file);\r\n            },\r\n        " +
"    success: function (file,response) {\r\n       " +
"         console.log(file);\r\n        " +
"        console.log(response)\r\n       " +
"   $(\"input[name=" + For.Name + "]\").val(response.data); " +
"     },\r\n           " +
" error: function (file, response) {\r\n      " +
"          file.previewElement.classList.add(\"dz-error\");\r\n     " +
"       }\r\n      " +
"  });\r\n   " +
" });" +
   "</script>";
            }
            else
            {
                ss = $@"<script type=text/javascript>" +
   "Dropzone.autoDiscover = false;" +
"    $(document).ready(function () {\r\n        //Simple Dropzonejs\r\n        $(\".uploader-" + For.Name + "\").dropzone({\r\n           " +

" init:function(){\r\n                myDropzone=this;\r\n                var file = {\r\n                    name: '" + result.BindImage(_configuration) + "',\r\n            " +
"        size: 1000,\r\n                    status: Dropzone.ADDED,\r\n                    accepted: true\r\n                };\r\n           " +
"     myDropzone.emit(\"addedfile\", file);\r\n      " +
"          myDropzone.emit(\"thumbnail\", file, \"" + result.BindImage(_configuration) + "\");\r\n         " +
"       myDropzone.emit(\"complete\", file);\r\n              " +
"  myDropzone.files.push(file);\r\n            },\r\n          " +
"  url: \"/Admin/Upload/UploadImage\",\r\n          " +
"  addRemoveLinks: true,\r\n          " +
"  maxFiles: 1,\r\n         " +
"   maxfilesexceeded: function (file) {\r\n          " +
"      this.removeAllFiles();\r\n             " +
"   this.addFile(file);\r\n            },\r\n        " +
"    success: function (file,response) {\r\n       " +
"         console.log(file);\r\n        " +
"        console.log(response)\r\n       " +
"   $(\"input[name=" + For.Name + "]\").val(response.data); " +
"     },\r\n           " +
" error: function (file, response) {\r\n      " +
"          file.previewElement.classList.add(\"dz-error\");\r\n     " +
"       }\r\n      " +
"  });\r\n   " +
" });" +
   "</script>";
            }


            var sb = new StringBuilder();
            sb.Append(ss);
            sb.AppendFormat("<input hidden name='{0}' value='{1}' />", For.Name.ToString(), For.Model);

            output.PostElement.SetHtmlContent(sb.ToString());
        }
        //public override void Process(TagHelperContext context, TagHelperOutput output)
        //{
        //    output.TagName = "input";
        //    output.Attributes.SetAttribute("type", "file");
        //    output.Attributes.SetAttribute("data-Id", For.Name);
        //    output.Attributes.SetAttribute("file-type", "image");
        //    output.Attributes.SetAttribute("class", "form-control");
        //    if (Multiple == true)
        //    {
        //        output.Attributes.SetAttribute("multiple", "multiple");

        //    }
        //    output.TagMode = TagMode.SelfClosing;

        //    var sb = new StringBuilder();
        //    sb.AppendFormat("<input hidden name='{0}' value='{1}' />", For.Name.ToString(), For.Model);
        //    if (For.Model != null)
        //    {
        //        var url = _context.GetAsync<tbl_Image>(x => x.Id == (long)For.Model).Result;
        //        if (url != null)
        //        {
        //            sb.AppendFormat("<img src='{0}' style='width:100px;height:100px' />", url.BindImage(_configuration));
        //        }

        //    }
        //    output.PostElement.SetHtmlContent(sb.ToString());
        //}
    }
    [HtmlTargetElement("multiple-image-upload")]
    public class MultipleImageUploaderTagHelper : TagHelper
    {
        private readonly ServiceContext _context;
        private readonly IConfiguration _configuration;
        public MultipleImageUploaderTagHelper(ServiceContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public ModelExpression For { get; set; }
        public string Id { get; set; }
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "input";
            output.Attributes.SetAttribute("type", "file");
            output.Attributes.SetAttribute("data-Id", For.Name);
            output.Attributes.SetAttribute("file-type", "image");
            output.Attributes.SetAttribute("class", "form-control");
            output.Attributes.SetAttribute("multiple", "multiple");
            output.TagMode = TagMode.SelfClosing;

            var sb = new StringBuilder();
            var ids = For.Model as long[];
            if (ids != null)
            {
                foreach (var item in ids)
                {

                    sb.AppendFormat("<input hidden name='{0}' value='{1}' />", For.Name.ToString(), item);
                }
            }
            if (For.Model != null)
            {
                foreach (var item in ids)
                {
                    var url = _context.GetAsync<tbl_Image>(x => x.Id == item).Result;
                    if (url != null)
                    {
                        sb.AppendFormat("<img src='{0}' style='width:100px;height:100px' />", url.BindImage(_configuration));
                    }
                }

            }
            output.PostElement.SetHtmlContent(sb.ToString());
        }
    }
    [HtmlTargetElement("file-upload")]
    public class FileUploaderTagHelper : TagHelper
    {
        public ModelExpression For { get; set; }
        public string Id { get; set; }
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "input";
            output.Attributes.SetAttribute("type", "file");
            output.Attributes.SetAttribute("data-Id", For.Name);
            output.Attributes.SetAttribute("file-type", "file");
            output.Attributes.SetAttribute("class", "form-control");
            output.TagMode = TagMode.SelfClosing;

            var sb = new StringBuilder();
            sb.AppendFormat("<input hidden name='{0}' value='{1}' id='{0}' />", For.Name.ToString(), For.Model);
            output.PostElement.SetHtmlContent(sb.ToString());
        }
    }
}
