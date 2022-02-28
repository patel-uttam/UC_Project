using Microsoft.AspNetCore.Http;
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
    public class CloudinaryImageController : ControllerBase
    {
        private readonly ICloudinaryImageRepository cloudinaryImageRepository;

        public CloudinaryImageController(ICloudinaryImageRepository repository)
        {
            cloudinaryImageRepository = repository;
        }
        // GET: api/<CloudinaryImageController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<CloudinaryImageController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CloudinaryImageController>
        [HttpPost]
        public async Task<IActionResult> Post(IFormFile image)
        {
            var upload_result = await cloudinaryImageRepository.UploadImage(image);
            if(upload_result.Error != null)
            {
                return BadRequest(upload_result.Error.Message);
            }
            else
            {
                return Ok("Image Upload Success..");
            }
        }

        // PUT api/<CloudinaryImageController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CloudinaryImageController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
