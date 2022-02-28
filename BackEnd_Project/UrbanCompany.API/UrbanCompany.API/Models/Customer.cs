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
            ReviewRatings = new HashSet<ReviewRating>();
        }

        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhone { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerAddress1 { get; set; }
        public string CustomerCity { get; set; }
        public string CustomerArea1 { get; set; }
        public string CustomerCity1 { get; set; }
        public string CustomerState1 { get; set; }
        public string CustomerAddress2 { get; set; }
        public string CustomerArea2 { get; set; }
        public string CustomerCity2 { get; set; }
        public string CustomerState2 { get; set; }
        public string CustomerCountry { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<OrderHistory> OrderHistories { get; set; }
        public virtual ICollection<OrderOngoing> OrderOngoings { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ReviewRating> ReviewRatings { get; set; }
    }
}
