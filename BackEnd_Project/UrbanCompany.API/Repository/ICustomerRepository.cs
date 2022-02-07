using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomer(string user);
        bool UpdateCustomer(int cust_id , Customer customer);

        //void DeleteCustomer(string name);

        //
        Customer AddCustomer(Customer customer);
    }
}
