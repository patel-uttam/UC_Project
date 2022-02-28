using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class Provider
    {
        public Provider()
        {
            OrderHistories = new HashSet<OrderHistory>();
            OrderOngoings = new HashSet<OrderOngoing>();
            ReviewRatings = new HashSet<ReviewRating>();
        }

        public int ProviderId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProviderPhone { get; set; }
        public string ProviderEmail { get; set; }
        public string ProviderCity { get; set; }
        public double? Rating { get; set; }
        public int? Category { get; set; }
        public string ProviderArea { get; set; }
        public string ProviderState { get; set; }
        public string ProviderCountry { get; set; }
        public bool? IsAvailable { get; set; }

        public virtual Category CategoryNavigation { get; set; }
        public virtual ICollection<OrderHistory> OrderHistories { get; set; }
        public virtual ICollection<OrderOngoing> OrderOngoings { get; set; }
        public virtual ICollection<ReviewRating> ReviewRatings { get; set; }
    }
}
