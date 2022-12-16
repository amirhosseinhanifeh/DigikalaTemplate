using System;

namespace ALO.ViewModels.Product.Admin
{
    public class GetProductListForAdminDto
    {
        public int Row { get; set; }
        public long Id { get; set; }
        public string Title { get; set; }
        public string Cost { get; set; }
        public string Image { get; set; }

        public string Status { get; set; }
        public string SubCategory { get; set; }
        public int OrderCount { get; set; }
        public int CommentCount { get; set; }
        public int Visit { get; set; }
    }
}
