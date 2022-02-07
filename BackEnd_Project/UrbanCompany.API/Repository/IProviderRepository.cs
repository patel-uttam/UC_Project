using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface IProviderRepository
    {
        IEnumerable<Provider> GetProviders();
        Provider GetProvider(string name);
        Provider UpdateProvider(Provider provider);
        Provider AddProvider(Provider provider);
        IEnumerable<Provider_OrderDisplay> Order_Assign_Provider(int provider_id);



        // filter method


        // get list of provider as per category and city
        IEnumerable<Provider> GetProviderByCategory_City(int category , string city);

        // get category as per provider address 
        public IEnumerable<string> GetCategory(string dist);
    }
}
