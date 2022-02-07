using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;
using UrbanCompany.API.Repository;
using UrbanCompany.API.Authentication;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository customer_repository;

        public CustomerController(ICustomerRepository repository)
        {
            customer_repository = repository;
        }



        
        [Authorize(Roles =Roles.Admin)]
        [HttpGet]

        // Get Method to Get Records of Customers (Admin has authority)
        
        // return Customer Record in Collections

        public IEnumerable<Customer> Get()
        {
            return customer_repository.GetCustomers();
            
        }

        // Get Method to Get Data Record By CustomerId (Only Authenticated one get it record)

        // return Customer Record

        [Authorize(Roles = Roles.Customer)]
        [HttpGet("{user}")]
        public Customer Get(string user)
        {
            return customer_repository.GetCustomer(user);
        }

        // Put to Update Customer Record

        [Authorize(Roles = Roles.Customer)]
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Customer customer)
        {
            return customer_repository.UpdateCustomer(id, customer);
        }

/*        // DELETE api/<CustomerController>/5
        [Authorize(Roles = Roles.User)]
        [HttpDelete("{name}")]
        public void Delete(string name)
        {
            customer_repository.DeleteCustomer(name);
        }*/
    }
}
