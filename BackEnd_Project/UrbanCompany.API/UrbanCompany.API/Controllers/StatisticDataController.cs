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
    public class StatisticDataController : ControllerBase
    {
        private readonly IStatisticDataRepository statisticDataRepository;
        public StatisticDataController(IStatisticDataRepository repository)
        {
            statisticDataRepository = repository;
        }

        // GET: api/<StatisticDataController>
        [HttpGet]
        public DisplayStatisticData Get()
        {
            var data = new DisplayStatisticData();

            data.TotalProvider = statisticDataRepository.Number_Of_Provider();
            data.TotalAmount = statisticDataRepository.Total_Of_All_Order();
            data.TotalOrder = statisticDataRepository.Number_Of_Order_Delivered();

            return data;
        }

    }
}
