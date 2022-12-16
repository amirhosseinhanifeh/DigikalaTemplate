using ALO.DataAccessLayer.DataContext;
using ALO.DomainClasses.Entity.IMG;
using ALO.DomainClasses.EntityHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
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

        public ImageUploaderTagHelper(ServiceContext context)
        {
            _context = context;
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
            if(Multiple==true)
            {
                output.Attributes.SetAttribute("multiple", "multiple");

            }
            output.TagMode = TagMode.SelfClosing;

            var sb = new StringBuilder();
            sb.AppendFormat("<input hidden name='{0}' value='{1}' />", For.Name.ToString(), For.Model);
            if(For.Model !=null)
            {
                var url = _context.GetAsync<tbl_Image>(x => x.Id == (long)For.Model).Result;
                if (url != null)
                {
                    sb.AppendFormat("<img src='{0}' style='width:100px;height:100px' />", url.BindImage());
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
