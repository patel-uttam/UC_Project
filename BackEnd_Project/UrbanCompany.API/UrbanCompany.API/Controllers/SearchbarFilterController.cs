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
    [Route("api/searchbar")]
    [ApiController]
    public class SearchbarFilterController : ControllerBase
    {
        private ISearchbarFilterRepository searchbarFilterRepository;

        public SearchbarFilterController(ISearchbarFilterRepository repository)
        {
            searchbarFilterRepository = repository;
        }
        // GET: api/<SearchbarFilterController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SearchbarFilterController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SearchbarFilterController>
        [HttpPost]
        [Route("search")]
        public IEnumerable<SearchbarFilter> Post([FromBody] string value)
        {
            return searchbarFilterRepository.GetSearchResult(value);
        }

        // PUT api/<SearchbarFilterController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SearchbarFilterController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
