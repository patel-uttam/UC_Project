using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace UrbanCompany.API.Authentication
{
    public class EmailConfirm
    {
        [Required(ErrorMessage ="username must be require")]
        public string UserName { get; set; }
        
        [Required(ErrorMessage ="verification code require")]
        public string Code { get; set; }
    }
}
