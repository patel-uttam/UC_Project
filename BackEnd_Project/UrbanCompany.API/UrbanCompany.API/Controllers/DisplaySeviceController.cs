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
    public class DisplaySeviceController : ControllerBase
    {
        private readonly IDisplayServicesRepository servicesRepository;

        public DisplaySeviceController(IDisplayServicesRepository display)
        {
            servicesRepository = display;
        }

        [HttpGet("services")]
        public IEnumerable<Service> Get()
        {
            return servicesRepository.Get_Services();
        }

        [HttpGet("{id}/service")]
        public Service Get(int id)
        {
            return servicesRepository.Get_Service_By_Id(id);
        }


        [HttpGet("{name}/services")]
        public IEnumerable<Service> Get(string name)
        {
            return servicesRepository.Get_Service(name);
        }

        [Authorize(Roles=Roles.Admin)]
        [HttpPost("new/service")]
        public bool Post([FromBody] Service service)
        {
            return servicesRepository.Add_Service(service);
        }

    }
}
