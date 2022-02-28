using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class SubService
    {
        public SubService()
        {
            Carts = new HashSet<Cart>();
            OrderHistories = new HashSet<OrderHistory>();
            OrderOngoings = new HashSet<OrderOngoing>();
            ReviewRatings = new HashSet<ReviewRating>();
        }

        public int SubServiceId { get; set; }
        public string SubServiceName { get; set; }
        public int? ServiceId { get; set; }
        public int Cost { get; set; }
        public int? Discount { get; set; }
        public int? ServiceTime { get; set; }
        public string Img1 { get; set; }
        public string Img2 { get; set; }
        public string Img3 { get; set; }
        public int? Rating { get; set; }
        public string Details { get; set; }

        public virtual Service Service { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<OrderHistory> OrderHistories { get; set; }
        public virtual ICollection<OrderOngoing> OrderOngoings { get; set; }
        public virtual ICollection<ReviewRating> ReviewRatings { get; set; }
    }
}
