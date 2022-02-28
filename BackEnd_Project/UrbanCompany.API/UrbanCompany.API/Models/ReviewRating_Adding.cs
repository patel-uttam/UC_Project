using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UrbanCompany.API.Models
{
    public class ReviewRating_Adding
    {
        public int ReviewId { get; set; }
        public string Review { get; set; }
        public int Rating { get; set; }
        public string SubService { get; set; }
        public int? OrderHistoryId { get; set; }
        public string Service { get; set; }
        public int? ProviderId { get; set; }
        public int? CustomerId { get; set; }
    }
}
