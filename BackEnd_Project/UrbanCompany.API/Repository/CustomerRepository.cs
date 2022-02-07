using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly UrbanCompanyContext context;

        public CustomerRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }

        public Customer AddCustomer(Customer customer)
        {
            context.Customers.Add(customer);
            context.SaveChanges();
            return customer;
        }

        /*        public void DeleteCustomer(string name)
                {
                    var deleted_customer = context.Customers.FirstOrDefault(c => c.CustomerName == name);
                    context.Remove(deleted_customer);
                    context.SaveChanges();
                }*/


        public Customer GetCustomer(string user)
        {
            var selected_customer = context.Customers.FirstOrDefault(c => c.CustomerName == user);

            return selected_customer;
        }


        public IEnumerable<Customer> GetCustomers()
        {
            return context.Customers;
        }

        public bool UpdateCustomer(int cust_id ,Customer customer)
        {
            if(cust_id == customer.CustomerId)
            {
                Customer c = context.Customers.FirstOrDefault(c => c.CustomerId == customer.CustomerId);

                c.CustomerAddress1 = customer.CustomerAddress1;
                c.CustomerCity = customer.CustomerCity;
                c.CustomerDistrict = customer.CustomerDistrict;

                context.Customers.Update(c);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}
