using System;
using System.Collections.Generic;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class EmailOtp
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public int Otp { get; set; }
        public string UserName { get; set; }
    }
}
