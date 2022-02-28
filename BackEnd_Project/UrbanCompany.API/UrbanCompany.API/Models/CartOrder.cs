﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UrbanCompany.API.Models
{
    public class CartOrder
    {
        public int CartId { get; set; }
        public int? Customer { get; set; }
        public int? Category { get; set; }
        public string Service { get; set; }
        public string SubService { get; set; }
        public int Cost { get; set; }
        public int Qty { get; set; }
        public string AddressLine { get; set; }
        public string Area { get; set; }
        public string city { get; set; }

    }
}
