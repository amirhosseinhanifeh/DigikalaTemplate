﻿
using ALO.DomainClasses.Entity.PFL;
using ALO.DomainClasses.Entity.Product;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Entity.IMG
{
    public class tbl_Image : BaseEntity
    {
        public byte[] Url { get; set; }
        public string Image_thumb { get; set; }
        public FileType FileType { get; set; }
        public ICollection<tbl_Profile> Profile { get; set; }
        public ICollection<tbl_Product> ProductMainImages { get; set; }
        public ICollection<tbl_Product> ProductImages { get; set; }
        public tbl_VideoDetail VideoDetail { get; set; }
    }
    public enum FileType : byte
    {
        Image = 0,
        Video = 1

    }
}
