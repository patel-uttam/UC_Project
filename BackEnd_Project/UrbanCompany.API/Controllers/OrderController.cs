using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;
using UrbanCompany.API.Authentication;
using UrbanCompany.API.Repository;


namespace UrbanCompany.API.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository orderRepository;


        public OrderController(IOrderRepository order )
        {
            orderRepository = order;
        }

        [Authorize(Roles = Roles.Customer)]
        [HttpGet("{cust_id}/order/ongoing")]
        public IEnumerable<OrderDisplay> Get(int cust_id)
        {
            return orderRepository.GetOrderOngoing(cust_id);
        }


        // To Make Order for Customr (Take param in  Collection type of  Cart).

        [Authorize(Roles = Roles.Customer)]
        [HttpPost("{id}/orderservice/{date}/{time}/{c_fee}")]
        public bool Post(int id, string date , string time, int c_fee, [FromBody] IEnumerable<CartDisplay> carts)
        {
            
            string s = "2022-02-05";

            DateTime D = DateTime.Parse(s);
            Console.Write(D);

            return orderRepository.Make_Order(id, carts, date, time,c_fee);
            
        }

    }
}
