using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Authentication;
using UrbanCompany.API.Models;
using UrbanCompany.API.Repository;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class DisplayCategoryController : ControllerBase
    {

        private readonly IDisplayServicesRepository servicesRepository;

        public DisplayCategoryController(IDisplayServicesRepository services)
        {
            servicesRepository = services;
        }

        // GET: api/<DisplayCategoryController>
        [HttpGet("categories")]
        public IEnumerable<Category> Get()
        {
            return servicesRepository.Get_Categories();
        }

        [HttpGet("{category_name}/category")]
        public Category Get(string category_name)
        {
            return servicesRepository.Get_Category(category_name);
        }


        // POST api/<DisplayCategoryController>
        [Authorize(Roles=Roles.Admin)]
        [HttpPost("new/category")]
        public bool Post([FromBody] Category category)
        {
            return servicesRepository.Add_Category(category);
        }

        // POST api/<DisplayCategoryController>
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("changes/category")]
        public bool Put([FromBody] Category category)
        {
            return servicesRepository.Update_Category(category);
        }

    }
}
