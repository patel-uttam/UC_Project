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
        public string LogoImg { get; set; }
        public string BgImg { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Provider> Providers { get; set; }
        public virtual ICollection<Service> Services { get; set; }
    }
}
