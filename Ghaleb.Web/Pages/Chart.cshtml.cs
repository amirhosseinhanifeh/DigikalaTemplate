using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using FusionCharts.DataEngine;
using FusionCharts.Visualization;
using System.Data;
using ALO.DataAccessLayer.DataContext;
using Microsoft.EntityFrameworkCore;
using ALO.Common.Utilities.ConvertTo;
using ALO.Common.Utilities.ConvertDt;
using FusionCharts;

namespace Ghaleb.Web.Pages
{
    public class ChartModel : PageModel
    {
        private readonly ServiceContext _context;

        public ChartModel(ServiceContext context)
        {
            _context = context;
        }

        [BindProperty(SupportsGet = true)]
        public long? Id { get; set; }
        [BindProperty(SupportsGet = true)]
        public long? ColorId { get; set; }
        public string ChartJson { get; set; }
        public string Title { get; set; }
        public async Task OnGetAsync()
        {
            var data = await _context.tbl_Products.Include(x => x.ProductPriceHistories).ThenInclude(x=>x.Color).FirstOrDefaultAsync(x => x.Id == Id);
            Title = data.Title;
            if(ColorId==null)
            {
                ColorId = data.ProductPriceHistories.First().ColorId;
            }
            DataTable ChartData = new DataTable();
            ChartData.Columns.Add("تاریخ", typeof(string));
            ChartData.Columns.Add("قیمت", typeof(decimal));
            foreach (var item in data.ProductPriceHistories.Where(x => x.ColorId == ColorId ).OrderBy(x => x.Id))
            {
                ChartData.Rows.Add(item.CreatedDate.ConvertToPesainDate().toPersianNumber(), item.Price);

            }
            StaticSource source = new StaticSource(ChartData);
            DataModel model = new DataModel();
            model.DataSources.Add(source);
            Charts.LineChart line = new Charts.LineChart("line_chart_db");
            model.DataSourceDateFormat = "0";
            line.ThemeName = FusionChartsTheme.ThemeName.FUSION;
            line.Width.Percentage(100);
            line.Height.Pixel(400);

            line.Data.Source = model;
            line.YAxis.FontName = "iranyekan";
            line.XAxis.FontName = "iranyekan";

            line.Caption.Text = "نمودار قیمت " + data.Title;
            line.Caption.Bold = true;
            line.Caption.FontName = "iranyekan";
            line.SubCaption.Text =data.ProductPriceHistories.FirstOrDefault(h=>h.ColorId==ColorId)?.Color?.Name;
            line.XAxis.Text = "تاریخ";
            line.YAxis.Text = "قیمت";
            line.Legend.Show = false;
            line.ThemeName = FusionChartsTheme.ThemeName.FUSION;

            // set chart rendering json
            ChartJson = line.Render();
        }
    }
}
