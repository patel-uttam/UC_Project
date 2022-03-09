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
            p.ProviderArea = provider.ProviderArea;
            p.ProviderCity = provider.ProviderCity;
            p.ProviderState = provider.ProviderState;
            p.ProviderCountry = provider.ProviderCountry;
            p.Category = provider.Category;
            p.IsAvailable = provider.IsAvailable;
            
            context.Providers.Update(p);
            context.SaveChanges();
            return p;
        }

        // To Fetch Order Assigned to Provider
        public IEnumerable<Provider_OrderDisplay> Order_Assign_Provider(int provider_id)
        {
            var orders = context.OrderOngoings.Where(og => og.Provider == provider_id).ToList();

            IList<Provider_OrderDisplay> provider_OrderDisplays = new List<Provider_OrderDisplay>();

            foreach(var o in orders)
            {
                var order = new Provider_OrderDisplay();

                order.AssignOrderId = o.OrderOngoingId;
                order.OrderId = o.OrderId;
                order.CustomerName = context.Customers.FirstOrDefault(c => c.CustomerId == o.Customer).CustomerName;
                order.CustomerPhone = context.Customers.FirstOrDefault(c => c.CustomerId == o.Customer).CustomerPhone;
                order.Service = context.Services.FirstOrDefault(s=>s.ServiceId == o.Service).ServiceName;
                order.SubService = context.SubServices.FirstOrDefault(ss => ss.SubServiceId == o.SubService).SubServiceName;
                order.ServiceDate = o.ServiceDate;
                order.ServiceTime = o.ServiceTime;
                order.Address = o.DeliveryAddress;
                order.Qty = o.Qty;

                provider_OrderDisplays.Add(order);
            }

            return provider_OrderDisplays;
        }



        /*filter*/
        public IEnumerable<Provider> GetProviderByCategory_City(int category , string area)
        {          
            var provider = context.Providers.Where(p => p.Category == category && p.ProviderArea == area && p.IsAvailable == true).ToList();
            if(provider.Count() > 0)
            {
                return provider;
            }
            else
            {
                var providers = new List<Provider>();
                var areaname = context.Areas.Where(a=>a.PinCode == (context.Areas.FirstOrDefault(a=>a.AreaName == area).PinCode)).Select(a=>a.AreaName).ToList();
                foreach(var name in areaname)
                {
                    var P = context.Providers.Where(p => p.ProviderArea == name).ToList();
                    if(P != null)
                    {
                        providers.AddRange(P);
                    }
                }
                return providers;
            }
        }

        // filter for fetch provider based on category_name and district
        public IEnumerable<Provider> GetProviderByCategoryName_City(string category,string city)
        {
            int cat_id = (int)context.Categories.FirstOrDefault(c => c.CategoryName == category).CategoryId;
            if (cat_id > 0)
            {
                return context.Providers.Where(p => p.Category == cat_id && p.ProviderCity == city);
            }
            else
            {
                return null;
            }
        }

        // filter for fetch categories based on specified district value
        public IEnumerable<string> GetCategory(string city)
        {
            var categories_id= context.Providers.Where(p => p.ProviderCity == city).Select(p=>p.Category).Distinct().ToList();

            List<string> category = new List<string>();

            foreach(var id in categories_id)
            {
                category.Add(context.Categories.FirstOrDefault(c => c.CategoryId == id).CategoryName.ToString());
            }
            return category;
        }
    }
}
