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

        
        // all get categories , services , subservices
        
        public IEnumerable<Category> Get_Categories()
        {
                return context.Categories.ToList();
        }
        public IEnumerable<Service> Get_Services()
        {
            return context.Services.ToList();
        }
        public IEnumerable<SubService> Get_SubServices()
        {
            return context.SubServices.ToList();
        }


        // add new category,service & subservice
        public bool Add_Category(Category category)
        {
            var cat = context.Categories.FirstOrDefault(c => c.CategoryName.ToLower() == category.CategoryName.ToLower());

            if (cat == null)
            {
                context.Categories.Add(category);
                context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }

        }
        public bool Add_Service(Service service)
        {
            var ser= context.Services.FirstOrDefault(s => s.ServiceName.ToLower() == service.ServiceName.ToLower());

            string cat_id = context.Categories.FirstOrDefault(c => c.CategoryId == service.CategoryId).ToString();

            if (ser == null && cat_id != null)
            {
                context.Services.Add(service);
                context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }
        public bool Add_SubService(SubService subservice)
        {
            var s_ser = context.SubServices.FirstOrDefault(ss => ss.SubServiceName == subservice.SubServiceName);

            string cat_id = context.Services.FirstOrDefault(c => c.ServiceId == subservice.ServiceId).ToString();

            if (s_ser == null && cat_id != null)
            {
                context.SubServices.Add(subservice);
                context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }


        // update subservice

        public bool Update_SubService(SubService subservice)
        {
            var s_sub = context.SubServices.FirstOrDefault(ss=>ss.SubServiceId == subservice.SubServiceId);

            if(s_sub != null)
            {
                s_sub.Cost = subservice.Cost;
                s_sub.Discount = subservice.Discount;
                s_sub.ServiceTime = subservice.ServiceTime;
                s_sub.Img1 = subservice.Img1;
                s_sub.Img2 = subservice.Img2;
                s_sub.Img3 = subservice.Img3;
                s_sub.Details = subservice.Details;

                context.SubServices.Update(s_sub);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        // Update Category
        public bool Update_Category(Category category)
        {
            var cat = context.Categories.FirstOrDefault(c => c.CategoryId == category.CategoryId);

            if (cat != null)
            {
                cat.LogoImg = category.LogoImg;
                cat.BgImg = category.BgImg;
                cat.Description = category.Description;

                context.Categories.Update(cat);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
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

        // To fetch category from db by category_id

        public Category Get_Category(string categoryname)
        {
            return context.Categories.FirstOrDefault(c => c.CategoryName == categoryname);
        }
    }
}




