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
    public class CityController : ControllerBase
    {


        private readonly IAddressRepository addressRepository;

        public CityController(IAddressRepository repository)
        {
            addressRepository = repository;
        }


        // GET api/<ValuesController>/5
        [HttpGet("{state_id}")]
        public IEnumerable<City> Get(int state_id)
        {
            return addressRepository.GetCities(state_id);
        }

        // POST api/<ValuesController>
        [HttpPost("addnew")]
        public bool Post([FromBody] City  city)
        {
            return addressRepository.AddCity(city);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
