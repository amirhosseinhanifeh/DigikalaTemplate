using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.IMG;
using ALO.DomainClasses.EntityHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AyandeNama.Web.Helpers.TagHelpers
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
            output.TagName = "input";
            output.Attributes.SetAttribute("type", "file");
            output.Attributes.SetAttribute("data-Id", For.Name);
            output.Attributes.SetAttribute("file-type", "image");
            output.Attributes.SetAttribute("class", "form-control");
            if (Multiple == true)
            {
                output.Attributes.SetAttribute("multiple", "multiple");

            }
            output.TagMode = TagMode.SelfClosing;

            var sb = new StringBuilder();
            sb.AppendFormat("<input hidden name='{0}' value='{1}' />", For.Name.ToString(), For.Model);
            if (For.Model != null)
            {
                var url = _context.GetAsync<tbl_Image>(x => x.Id == (long)For.Model).Result;
                if (url != null)
                {
                    sb.AppendFormat("<img src='{0}' style='width:100px;height:100px' />", url.BindImage(_configuration));
                }

            }
            output.PostElement.SetHtmlContent(sb.ToString());
        }
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
