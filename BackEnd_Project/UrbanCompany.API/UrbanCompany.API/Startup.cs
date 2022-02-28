using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using UrbanCompany.API.Authentication;
using UrbanCompany.API.Controllers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UrbanCompany.API.Models;
using UrbanCompany.API.Repository;

namespace UrbanCompany.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddControllers();

            // to handle  ThrowInvalidOperationException_SerializerCycleDetected
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);


            services.AddDbContext<AuthenticationContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("conn")));
            services.AddDbContext<UrbanCompanyContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("conn")));

            services.AddScoped<ICustomerRepository,CustomerRepository>();
            services.AddScoped<IProviderRepository, ProviderRepository>();
            services.AddScoped<IDisplayServicesRepository, DisplayServicesRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderHistoryRepository,OrderHistoryRepository>();
            services.AddScoped<IStatisticDataRepository,StatisticDataRepository>();
            services.AddScoped<IAddressRepository,AddressRepository>();
            services.AddScoped<IReviewRatingRepository,ReviewRatingRepository>();
            services.AddScoped<IEmailOtpRepository, EmailOtpRepository>();
            services.AddScoped<ICloudinaryImageRepository,CloudinaryImageRepository>();

            services.AddIdentity<Users, IdentityRole>(opt=> {
                opt.SignIn.RequireConfirmedEmail = true;
            }).AddEntityFrameworkStores<AuthenticationContext>().AddDefaultTokenProviders();


            // authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(opt => { opt.SaveToken = true; opt.RequireHttpsMetadata = false; 
                opt.TokenValidationParameters = 
                new TokenValidationParameters { 
                    ValidateIssuer = true, 
                    ValidateAudience = true, 
                    ValidIssuer = Configuration["JWT:ValidIssuer"], 
                    ValidAudience = Configuration["JWT:ValidAudience"], 
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                }; 
            });

            services.AddCors(options => 
            {
                options.AddPolicy("EnableCORS", builder => 
                {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();

            app.UseCors("EnableCORS");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
