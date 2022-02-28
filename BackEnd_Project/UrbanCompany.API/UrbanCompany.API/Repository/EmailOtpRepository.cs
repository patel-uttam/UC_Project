using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class EmailOtpRepository : IEmailOtpRepository
    {
        private readonly UrbanCompanyContext context;

        public EmailOtpRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }

        public void AddEmailOtp(EmailOtp emailOtp)
        {
            context.EmailOtps.Add(emailOtp);
            context.SaveChanges();
        }

        public EmailOtp GetEmailOtp(string username)
        {
            return context.EmailOtps.FirstOrDefault(ot=>ot.UserName == username);
        }

        public void DeleteEmailOtp(string username)
        {
            var emailotp = context.EmailOtps.FirstOrDefault(ot => ot.UserName == username);
            context.Remove(emailotp);
            context.SaveChanges();

        }
    }
}
