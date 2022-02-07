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

        [HttpGet("{id}/category")]
        public string Get(int id,int id1)
        {
            return servicesRepository.Get_Category(id);
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

    }
}
