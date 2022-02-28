using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class Area
    {
        public int AreaId { get; set; }
        public string AreaName { get; set; }
        public int PinCode { get; set; }
        public int? CityId { get; set; }

        public virtual City City { get; set; }
    }
}
