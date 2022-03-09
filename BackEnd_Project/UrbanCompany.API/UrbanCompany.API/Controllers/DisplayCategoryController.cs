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
using CloudinaryDotNet.Actions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class DisplayCategoryController : ControllerBase
    {

        private readonly IDisplayServicesRepository servicesRepository;
        private readonly ICloudinaryImageRepository cloudinaryImageRepository;

        public DisplayCategoryController(IDisplayServicesRepository services , ICloudinaryImageRepository cloudinary)
        {
            servicesRepository = services;
            cloudinaryImageRepository = cloudinary;
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
            ImageUploadResult logo_result = new ImageUploadResult();
            ImageUploadResult bg_result = new ImageUploadResult();

            try
            {
                IFormFile logo_img = HttpContext.Request.Form.Files[1];
                if (logo_img != null)
                {
                    logo_result = await cloudinaryImageRepository.CategoryUploadImage(logo_img);
                }

                IFormFile background_image = HttpContext.Request.Form.Files[2];
                if (background_image != null)
                {
                    bg_result = await cloudinaryImageRepository.CategoryUploadImage(background_image);
                }
                if (logo_result.StatusCode == System.Net.HttpStatusCode.OK && bg_result.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var category = JsonConvert.DeserializeObject<Category>(HttpContext.Request.Form["category"]);
                    category.LogoImg = logo_result.SecureUrl.AbsoluteUri;
                    category.BgImg = bg_result.SecureUrl.AbsoluteUri;
                    bool IscategoryUpdate = servicesRepository.Add_Category(category);

                    if (IscategoryUpdate)
                        return new OkResult();
                    return new StatusCodeResult(500);
                }
                else
                {
                    return new StatusCodeResult(500);
                }
            }
            catch
            {
                return new StatusCodeResult(500);
            }
        }

        // POST api/<DisplayCategoryController>
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("changes/category")]
        public async Task<IActionResult> Put()
        {
            ImageUploadResult logo_result = new ImageUploadResult();
            ImageUploadResult bg_result = new ImageUploadResult();

            try
            {
                IFormFile logo_img = HttpContext.Request.Form.Files[1];
                if (logo_img != null)
                {
                    logo_result = await cloudinaryImageRepository.CategoryUploadImage(logo_img);
                }

                IFormFile bg_image = HttpContext.Request.Form.Files[2];
                if (bg_image != null)
                {
                    bg_result = await cloudinaryImageRepository.CategoryUploadImage(bg_image);
                }
                if (logo_result.StatusCode == System.Net.HttpStatusCode.OK && bg_result.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var category = JsonConvert.DeserializeObject<Category>(HttpContext.Request.Form["category"]);
                    category.LogoImg = logo_result.SecureUrl.AbsoluteUri;
                    category.BgImg = bg_result.SecureUrl.AbsoluteUri;
                    bool IscategoryUpdate = servicesRepository.Update_Category(category);

                    if (IscategoryUpdate)
                        return new OkResult();
                    return new StatusCodeResult(500);
                }
                else
                {
                    return new StatusCodeResult(500);
                }

            }
            catch
            {
                return new StatusCodeResult(500);
            }
        }

    }
}
