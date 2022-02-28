using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int? Customer { get; set; }
        public int? Service { get; set; }
        public int? SubService { get; set; }
        public int Cost { get; set; }
        public int Qty { get; set; }

        public virtual Customer CustomerNavigation { get; set; }
        public virtual Service ServiceNavigation { get; set; }
        public virtual SubService SubServiceNavigation { get; set; }
    }
}
