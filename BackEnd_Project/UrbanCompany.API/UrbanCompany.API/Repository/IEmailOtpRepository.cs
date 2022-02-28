using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface IEmailOtpRepository
    {
        public EmailOtp GetEmailOtp(string username);

        public void AddEmailOtp(EmailOtp emailOtp);

        public void DeleteEmailOtp(string username);
    }
}
