using ALO.DomainClasses.Entity.City;
using System;
using System.Collections.Generic;
using System.Text;

namespace ALO.DomainClasses.Entity.Country
{
    public class tbl_Country:BaseEntity
    {
        #region Properties
        /// <summary>
        /// Country Name
        /// </summary>
        public string Name { get; set; }

        #endregion

        #region Navigation

        public ICollection<tbl_City> Cities { get; set; }
        #endregion
    }
}
