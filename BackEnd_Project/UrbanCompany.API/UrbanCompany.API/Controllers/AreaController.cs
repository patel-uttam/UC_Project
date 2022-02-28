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
    public class AreaController : ControllerBase
    {

        private readonly IAddressRepository addressRepository;

        public AreaController(IAddressRepository repository)
        {
            addressRepository = repository;
        }


        // GET api/<AreaController>/5
        [HttpGet("{city_id}")]
        public IEnumerable<Area> Get(int city_id)
        {
            return addressRepository.GetAreas(city_id);
        }

        // POST api/<AreaController>
        [HttpPost("addnew")]
        public bool Post([FromBody] Area area)
        {
            return addressRepository.AddArea(area);
        }

        // PUT api/<AreaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AreaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
