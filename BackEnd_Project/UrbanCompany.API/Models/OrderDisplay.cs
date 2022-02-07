using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UrbanCompany.API.Models
{
    public class OrderDisplay
    {
        public int OrderDisplayId { get; set; }
        public int OrderId { get; set; }
        public int? Customer { get; set; }
        public string Provider_First { get; set; }
        public string Provider_Last { get; set; }
        public string Service { get; set; }
        public string SubService { get; set; }
        public string ServiceDate { get; set; }
        public string ServiceTime { get; set; }
        public int Cost { get; set; }
        public int Qty { get; set; }
    }
}
