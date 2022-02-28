using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class ReviewRating
    {
        public int ReviewId { get; set; }
        public string Review { get; set; }
        public int Rating { get; set; }
        public int? SubServiceId { get; set; }
        public int? OrderHistoryId { get; set; }
        public int? ServiceId { get; set; }
        public int? ProviderId { get; set; }
        public int? CustomerId { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual OrderHistory OrderHistory { get; set; }
        public virtual Provider Provider { get; set; }
        public virtual Service Service { get; set; }
        public virtual SubService SubService { get; set; }
    }
}
