using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace UrbanCompany.API.Authentication
{
    public class Registration
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
    }
}
