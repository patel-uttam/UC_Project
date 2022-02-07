using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Repository;
using UrbanCompany.API.Models;
using UrbanCompany.API.Authentication;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api/filter_providers")]
    [ApiController]
    public class DisplayProviderController : ControllerBase
    {
        private readonly IProviderRepository providerRepository;

        public DisplayProviderController(IProviderRepository repository)
        {
            providerRepository = repository;
        }

        // GET api/<DisplayProviderController>/5

        [HttpGet("{id}/{name}")]
        public IEnumerable<Provider> Get(int id,string name)
        {
            return providerRepository.GetProviderByCategory_City(id,name);
        }
    }
}
