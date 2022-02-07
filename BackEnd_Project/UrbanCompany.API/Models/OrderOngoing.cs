using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class OrderOngoing
    {
        public int OrderOngoingId { get; set; }
        public int OrderId { get; set; }
        public int? Customer { get; set; }
        public int? Provider { get; set; }
        public int? Service { get; set; }
        public int? SubService { get; set; }
        public string ServiceDate { get; set; }
        public string ServiceTime { get; set; }
        public int Cost { get; set; }
        public int Qty { get; set; }

        public virtual Customer CustomerNavigation { get; set; }
        public virtual Order Order { get; set; }
        public virtual Provider ProviderNavigation { get; set; }
        public virtual Service ServiceNavigation { get; set; }
        public virtual SubService SubServiceNavigation { get; set; }
    }
}
