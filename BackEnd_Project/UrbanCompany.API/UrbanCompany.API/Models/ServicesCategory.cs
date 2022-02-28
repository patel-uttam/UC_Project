using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class ServicesCategory
    {
        public ServicesCategory()
        {
            Carts = new HashSet<Cart>();
            OrderHistories = new HashSet<OrderHistory>();
            Providers = new HashSet<Provider>();
            SubServices = new HashSet<SubService>();
        }

        public int ServiceId { get; set; }
        public string ServiceName { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<OrderHistory> OrderHistories { get; set; }
        public virtual ICollection<Provider> Providers { get; set; }
        public virtual ICollection<SubService> SubServices { get; set; }
    }
}
