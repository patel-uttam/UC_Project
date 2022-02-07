 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class DisplayServicesRepository : IDisplayServicesRepository
    {
        private readonly UrbanCompanyContext context;

        public DisplayServicesRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }


        // To fetch services from db by category_name
        public IEnumerable<Service> Get_Service(string category_name)
        {
            return context.Services.Where(s => s.CategoryId == context.Categories.FirstOrDefault(c=>c.CategoryName == category_name).CategoryId);   
        }

        // To fetch service from db by service_id

        public Service Get_Service_By_Id(int id)
        {
            return context.Services.FirstOrDefault(s => s.ServiceId == id);
        }

        // To fetch subservices from db by service_id

        public IEnumerable<SubService> Get_Sub_Service(int service_id)
        {
            return context.SubServices.Where(ss=>ss.ServiceId == (context.Services.FirstOrDefault(s => s.ServiceId == service_id).ServiceId));
        }

        // To fetch subservice from db by subservice_id

        public SubService Get_Sub_Service_By_Id(int id)
        {
            return context.SubServices.FirstOrDefault(ss => ss.SubServiceId == id);
        }

        // To fetch categoryName from db by category_id

        public string Get_Category(int id)
        {
            return context.Categories.FirstOrDefault(c=>c.CategoryId == id).CategoryName;   
        }
    }
}




