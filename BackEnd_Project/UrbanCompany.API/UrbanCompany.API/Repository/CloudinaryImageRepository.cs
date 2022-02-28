using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UrbanCompany.API.Repository
{
    public class CloudinaryImageRepository : ICloudinaryImageRepository
    {
        private readonly Cloudinary cloudinary;
        public CloudinaryImageRepository(IConfiguration counfiguration)
        {
            Account cloudinary_account = new Account
                (
                    counfiguration.GetSection("Cloudinarycredentials:cloudname").Value,
                    counfiguration.GetSection("Cloudinarycredentials:apikey").Value,
                    counfiguration.GetSection("Cloudinarycredentials:apisecret").Value
                );

            cloudinary = new Cloudinary(cloudinary_account);
        }

        public async Task<ImageUploadResult> UploadImage(IFormFile image)
        {
            var Isupload = new ImageUploadResult();

            if(image.Length>0)
            {
                using var stream = image.OpenReadStream();
                var uploadparams = new ImageUploadParams
                {
                    File = new FileDescription(image.FileName, stream),
                    PublicId = "Categories/"+String.Join('_',image.FileName.Split('.')),
                    Overwrite = false
                };
                Isupload = await cloudinary.UploadAsync(uploadparams);
            }
            return Isupload;
        }
    }
}                                                                                                                   