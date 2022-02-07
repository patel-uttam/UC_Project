using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;
using UrbanCompany.API;

namespace UrbanCompany.API.Repository
{
    public interface IDisplayServicesRepository
    {

        // services

            // get services by category_id
            IEnumerable<Service> Get_Service(string name);

            // get service by service+name
            Service Get_Service_By_Id(int id);


        // sub services

            // get seuservice by service_id
            IEnumerable<SubService> Get_Sub_Service(int id);
            
            // get service by service_name
            SubService Get_Sub_Service_By_Id(int id);


        // Category

        string Get_Category(int id);
    }
}
