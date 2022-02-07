using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;
using UrbanCompany.API.Authentication;
using UrbanCompany.API.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class OrderHistoryController : ControllerBase
    {
        private readonly IOrderHistoryRepository orderHistoryRepository;
        public OrderHistoryController(IOrderHistoryRepository repository)
        {
            orderHistoryRepository = repository;
        }

        // Get Method to Get Order History of Customer.

        [Authorize(Roles = Roles.Customer)]
        [HttpGet("{id}/order/history")]
        public IEnumerable<OrderDisplay> Get(int id)
        {
            return orderHistoryRepository.GetOrderHistory(id);
        }

        // To Add  Complete Order To Order History Record
        [Authorize(Roles = Roles.Customer)]
        [HttpPost("{id}/ordercomplete")]
        public bool post(int id , [FromBody] IEnumerable<OrderOngoing> og)
        {
            return orderHistoryRepository.Order_Complete(id,og);
        }


    }
}
