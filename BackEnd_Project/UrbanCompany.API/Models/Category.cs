using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class Category
    {
        public Category()
        {
            Providers = new HashSet<Provider>();
            Services = new HashSet<Service>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<Provider> Providers { get; set; }
        public virtual ICollection<Service> Services { get; set; }
    }
}
