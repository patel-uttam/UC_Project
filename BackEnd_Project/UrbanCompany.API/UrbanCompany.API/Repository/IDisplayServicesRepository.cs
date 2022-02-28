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
        // select all

            // get  categories
            IEnumerable<Category> Get_Categories();
            // get  services
            IEnumerable<Service> Get_Services();
            // get  categories
            IEnumerable<SubService> Get_SubServices();


        // add new category,service & subservice

            // add new category
            public bool Add_Category(Category category);
            // add new service
            public bool Add_Service(Service service);
            // add new subservice   
            public bool Add_SubService(SubService subservice);

        // update 

            // update subservice   
            public bool Update_SubService(SubService subservice);
            // delete Category
            public bool Update_Category(Category category);



        // get services by category_id
        IEnumerable<Service> Get_Service(string name);

            // get service by service+name
            public Service Get_Service_By_Id(int id);


        // sub services

            // get seuservice by service_id
            public IEnumerable<SubService> Get_Sub_Service(int id);
            
            // get service by service_name
            public SubService Get_Sub_Service_By_Id(int id);


        // Category
            // get category by category_id
            public Category Get_Category(string category_name);
    }
}
