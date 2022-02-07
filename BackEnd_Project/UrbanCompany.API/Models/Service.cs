using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class Service
    {
        public Service()
        {
            Carts = new HashSet<Cart>();
            OrderHistories = new HashSet<OrderHistory>();
            OrderOngoings = new HashSet<OrderOngoing>();
            SubServices = new HashSet<SubService>();
        }

        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<OrderHistory> OrderHistories { get; set; }
        public virtual ICollection<OrderOngoing> OrderOngoings { get; set; }
        public virtual ICollection<SubService> SubServices { get; set; }
    }
}
