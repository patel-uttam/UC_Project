using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Authentication;
using UrbanCompany.API.Models;
using UrbanCompany.API.Repository;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class DisplayCategoryController : ControllerBase
    {

        private readonly IDisplayServicesRepository servicesRepository;
        private readonly ICloudinaryImageRepository cloudinaryImageRepository;

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
        public async Task<IActionResult> Post()
        {
            try
            {
                IFormFile logo_img = JsonConvert.DeserializeObject<IFormFile>(HttpContext.Request.Form["logo"]);
                var logo_result = await cloudinaryImageRepository.UploadImage(logo_img);

                IFormFile background_image = JsonConvert.DeserializeObject<IFormFile>(HttpContext.Request.Form["background-image"]);
                var bg_result = await cloudinaryImageRepository.UploadImage(logo_img);

                if(logo_result.Error == null && bg_result.Error == null)
                {
                    var category = JsonConvert.DeserializeObject<Category>(HttpContext.Request.Form["category"]);
                    bool IscategoryUpdate = servicesRepository.Add_Category(category);

                    if (IscategoryUpdate)
                        return new OkResult();
                    return new BadRequestResult();
                }
                else
                {
                    return new BadRequestResult();
                }

            }
            catch
            {
                return new BadRequestResult();
            }
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
