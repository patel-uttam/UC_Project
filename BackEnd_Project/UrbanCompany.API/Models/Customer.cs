using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Carts = new HashSet<Cart>();
            OrderHistories = new HashSet<OrderHistory>();
            OrderOngoings = new HashSet<OrderOngoing>();
            Orders = new HashSet<Order>();
        }

        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerAddress1 { get; set; }
        public string CustomerCity { get; set; }
        public string CustomerDistrict { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<OrderHistory> OrderHistories { get; set; }
        public virtual ICollection<OrderOngoing> OrderOngoings { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
