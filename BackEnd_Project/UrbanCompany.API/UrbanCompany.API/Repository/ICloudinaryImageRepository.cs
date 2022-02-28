using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace UrbanCompany.API.Repository
{
    public interface ICloudinaryImageRepository
    {
        public Task<ImageUploadResult> UploadImage(IFormFile image);
    }
}
