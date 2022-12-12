﻿using ALO.Common.Enums;
using ALO.DomainClasses.Entity.Account;
using ALO.DomainClasses.Entity.IMG;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ALO.DomainClasses.Entity.PFL
{
    public class tbl_Profile
    {
        [Key]
        public long Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }


        #region Navigation

        public tbl_Users User { get; set; }

        public long? AvatarId { get; set; }
        public tbl_Image Avatar { get; set; }

        #endregion
    }
}
