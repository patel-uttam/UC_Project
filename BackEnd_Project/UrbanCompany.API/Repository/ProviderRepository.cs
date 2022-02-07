using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
 
    public class ProviderRepository : IProviderRepository
    {

        private readonly UrbanCompanyContext context;

        public ProviderRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }

        // TO Fetch PRoviders
        public IEnumerable<Provider> GetProviders()
        {
            return context.Providers;
        }

        // To Add New Provider
        public Provider AddProvider(Provider provider)
        {
            context.Providers.Add(provider);
            context.SaveChanges();
            return provider;
        }

        //  TO Fetch Provider
        public Provider GetProvider(string name)
        {
            var selected_provider = context.Providers.FirstOrDefault(p=>p.UserName == name);
            return selected_provider;
        }


        // TO Update Provider details
        public Provider UpdateProvider(Provider provider)
        {
            Provider p = context.Providers.FirstOrDefault(p=>p.ProviderId == provider.ProviderId);
            
            p.FirstName = provider.FirstName;
            p.LastName = provider.LastName;
            p.ProviderCity = provider.ProviderCity;             
            p.ProviderDistrict = provider.ProviderDistrict;

            context.Providers.Update(p);
            context.SaveChanges();
            return p;
        }

        // To Fetch Order Assigned to Provider
        public IEnumerable<Provider_OrderDisplay> Order_Assign_Provider(int provider_id)
        {
            var orders = context.OrderOngoings.Where(og => og.Provider == provider_id);

            IList<Provider_OrderDisplay> provider_OrderDisplays = new List<Provider_OrderDisplay>();

            foreach(var o in orders)
            {
                var order = new Provider_OrderDisplay();

                order.AssignOrderId = o.OrderOngoingId;
                order.OrderId = o.OrderId;
                order.CustomerPhone = context.Customers.FirstOrDefault(c => c.CustomerId == o.Customer).CustomerPhone;
                order.Service = context.Services.FirstOrDefault(s=>s.ServiceId == o.Service).ServiceName;
                order.SubService = context.SubServices.FirstOrDefault(ss => ss.SubServiceId == o.SubService).SubServiceName;
                order.ServiceDate = o.ServiceDate;
                order.ServiceTime = o.ServiceTime;
                order.Qty = o.Qty;

                provider_OrderDisplays.Add(order);
            }

            return provider_OrderDisplays;
        }



        /*filter*/
        public IEnumerable<Provider> GetProviderByCategory_City(int category , string city)
        {                    
            return context.Providers.Where(p => p.Category == category && p.ProviderCity == city);
        }

        public IEnumerable<string> GetCategory(string dist)
        {
            var categories_id= context.Providers.Where(p => p.ProviderDistrict == dist).Select(p=>p.Category).Distinct().ToList();

            List<string> category = new List<string>();

            foreach(var id in categories_id)
            {
                category.Add(context.Categories.FirstOrDefault(c => c.CategoryId == id).CategoryName.ToString());
            }
            return category;
        }
    }
}
