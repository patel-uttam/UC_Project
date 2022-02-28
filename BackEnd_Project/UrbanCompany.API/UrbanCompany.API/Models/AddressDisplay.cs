using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UrbanCompany.API.Models
{
    public class AddressDisplay
    {
        public string AddressLine { get; set; }
        public string Area { get; set; }
        public int pincode { get; set; }
        public string city { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}
