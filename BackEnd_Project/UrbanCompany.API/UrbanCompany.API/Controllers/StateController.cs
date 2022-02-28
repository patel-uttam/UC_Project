using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Repository;
using UrbanCompany.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {

        private readonly IAddressRepository addressRepository;

        public StateController(IAddressRepository repository)
        {
            addressRepository = repository;
        }

        // GET api/<StateController>/5
        [HttpGet("{country_id}")]
        public IEnumerable<State> Get(int country_id)
        {
            return addressRepository.GetStates(country_id);
        }

        // POST api/<StateController>
        [HttpPost("addnew")]
        public bool Post([FromBody] State state)
        {
            return addressRepository.AddState(state);
        }

        // PUT api/<StateController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StateController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
