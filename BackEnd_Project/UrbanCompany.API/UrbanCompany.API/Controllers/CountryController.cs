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
    public class CountryController : ControllerBase
    {
        private readonly IAddressRepository addressRepository;

        public CountryController(IAddressRepository repository)
        {
            addressRepository = repository;
        }


        // GET: api/<CountryController>
        [HttpGet]
        public IEnumerable<Country> Get()
        {
            return addressRepository.GetCountries();
        }


        // POST api/<CountryController>
        [HttpPost("addnew")]
        public bool Post([FromBody] Country country)
        {
            return addressRepository.AddCountry(country);
        }

        // PUT api/<CountryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

    }
}
