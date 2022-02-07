using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UrbanCompany.API.Models
{
    public class Provider_OrderDisplay
    {
        public int AssignOrderId { get; set; }
        public int OrderId { get; set; }
        public string CustomerPhone { get; set; }
        public string Service { get; set; }
        public string SubService { get; set; }
        public string ServiceDate { get; set; }
        public string ServiceTime { get; set; }
        public int Qty { get; set; }
    }
}
