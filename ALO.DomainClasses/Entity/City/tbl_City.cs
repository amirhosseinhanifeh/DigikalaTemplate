
using ALO.DomainClasses.Entity.Country;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Entity.City
{
    public class tbl_City:BaseEntity
    {
        public string Name { get; set; }

        public long CountryId { get; set; }

        #region Navigation

        public tbl_Country Country { get; set; }


        #endregion
    }
}
