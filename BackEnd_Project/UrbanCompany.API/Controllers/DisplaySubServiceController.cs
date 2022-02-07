using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Repository;
using UrbanCompany.API.Models;
using UrbanCompany.API.Authentication;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class DisplaySubServiceController : ControllerBase
    {

        private readonly IDisplayServicesRepository servicesRepository;

        public DisplaySubServiceController(IDisplayServicesRepository repository)
        {
            servicesRepository = repository;
        }

        [HttpGet("{id}/subservices")]
        public IEnumerable<SubService> Get(int id,int id1)
        {
            return servicesRepository.Get_Sub_Service(id);
        }

        [HttpGet("{id}/subservice")]
        public SubService Get(int id)
        {
            return servicesRepository.Get_Sub_Service_By_Id(id);
        }
    }
}
