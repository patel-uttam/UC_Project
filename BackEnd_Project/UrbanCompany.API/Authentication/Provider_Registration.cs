using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UrbanCompany.API.Authentication
{
    public class Provider_Registration
    {
        [Required(ErrorMessage = "User Name is required")]
        public String UserName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is Required")]
        public string Email { get; set; }


        [Phone]
        [Required(ErrorMessage = "Phone is required")]
        [MaxLength(10)]
        [MinLength(10)]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(7)]
        [MaxLength(16)]
        public string Password { get; set; }

        [Required(ErrorMessage = "FirstName is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string ProviderCity { get; set; }
        
        [Required(ErrorMessage = "District is required")]
        public string ProviderDistrict { get; set; }

        [Required(ErrorMessage = "Service_Category is required")]
        public int Category { get; set; }
    }
}
