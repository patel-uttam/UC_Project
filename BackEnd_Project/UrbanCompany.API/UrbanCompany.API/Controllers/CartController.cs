using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;
using UrbanCompany.API.Repository;
using UrbanCompany.API.Authentication;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository cartRepository;

        public CartController(ICartRepository cart)
        {
            cartRepository = cart;
        }



        [Authorize(Roles = Roles.Customer)]
        [HttpGet("{id}/carts")]
        public IEnumerable<CartDisplay> Get(int id)
        {
            return cartRepository.GetCart(id);
        }

        // POST api/<CartController>
        [Authorize(Roles = Roles.Customer)]
        [HttpPost("{id}/addtocart")]
        public Boolean Post(int id,[FromBody] Cart cart)
        {
            return cartRepository.AddToCart(id, cart);
        }


        // DELETE api/<CartController>/5
        [Authorize(Roles = Roles.Customer)]
        [HttpDelete("{id1}/cartdelete/{id2}")]
        public void Delete(int id1 , int id2)
        {
            cartRepository.DeleteCart(id1, id2);
        }
        // DELETE api/<CartController>/5
        [Authorize(Roles = Roles.Customer)]
        [HttpDelete("{id}/cartdelete")]
        public void Delete(int id)
        {
            cartRepository.DeleteCarts(id);
        }
    }
}
