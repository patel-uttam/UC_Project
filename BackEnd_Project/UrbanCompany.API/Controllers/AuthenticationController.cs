
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UrbanCompany.API.Models;
using UrbanCompany.API.Repository;
using UrbanCompany.API.Authentication;

namespace UrbanCompany.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<Users> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly ICustomerRepository customerRepository;
        private readonly IProviderRepository providerRepository;

        public AuthenticationController(UserManager<Users> userManager, RoleManager<IdentityRole> roleManager, IConfiguration _configuration , ICustomerRepository customer,IProviderRepository provider)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            configuration = _configuration;
            customerRepository = customer;
            providerRepository = provider;
        }


        // Post Method to Add New Entry of Customer.

        [HttpPost]
        [Route("register-Customer")]

        public async Task<IActionResult> Register_User([FromBody] Registration registration)
        {
            var user = await userManager.FindByNameAsync(registration.UserName);
            if (user != null)
            {
                return StatusCode(StatusCodes.Status302Found, new { status = StatusCodes.Status302Found, title = "User Exists" });
            }
            Users newuser = new Users()
            {
                UserName = registration.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = registration.Email,
                PhoneNumber = registration.PhoneNumber.ToString()
            };
            var add_user = await userManager.CreateAsync(newuser, registration.Password);
            if (!add_user.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = StatusCodes.Status500InternalServerError, title = "Error in register user or Email is taken already" });
            }

            if (!await roleManager.RoleExistsAsync(Roles.Customer))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Customer));
            }
            if (await roleManager.RoleExistsAsync(Roles.Customer))
            {
                await userManager.AddToRoleAsync(newuser, Roles.Customer);
            }
            Customer c = new Customer();
            c.CustomerName = registration.UserName;
            c.CustomerPhone = registration.PhoneNumber;
            c.CustomerEmail = registration.Email;

            customerRepository.AddCustomer(c);
            return Ok(new 
            { 
                status = StatusCodes.Status200OK, 
                title = "Registration complete"
            });


        }


        // Post Method to Add New Entry of ServiceProvider

        [HttpPost]
        [Route("register-provider")]

        public async Task<IActionResult> Register_Provider([FromBody] Registration registration)
        {
            var user = await userManager.FindByNameAsync(registration.UserName);
            if (user != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = StatusCodes.Status302Found, title = "User Exists" });
            }
            Users newuser = new Users()
            {
                UserName = registration.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = registration.Email,
                PhoneNumber = registration.PhoneNumber.ToString()
            };

            var add_user = await userManager.CreateAsync(newuser, registration.Password);
            if (!add_user.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = StatusCodes.Status500InternalServerError, title = "Error in register user or Email is taken already" });
            

            if (!await roleManager.RoleExistsAsync(Roles.Provider))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Provider));
            }
            if (await roleManager.RoleExistsAsync(Roles.Provider))
            {
                await userManager.AddToRoleAsync(newuser, Roles.Provider);
            }
            if (!await roleManager.RoleExistsAsync(Roles.Customer))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Customer));
            }
            if (await roleManager.RoleExistsAsync(Roles.Customer))
            {
                await userManager.AddToRoleAsync(newuser, Roles.Customer);
            }

            Provider p = new Provider();
            p.UserName = registration.UserName;
            p.ProviderPhone = registration.PhoneNumber;
            p.ProviderEmail = registration.Email;

            providerRepository.AddProvider(p);

            Customer c = new Customer();
            c.CustomerName = registration.UserName;
            c.CustomerPhone = registration.PhoneNumber;
            c.CustomerEmail = registration.Email;
            customerRepository.AddCustomer(c);


            return Ok(new
            {
                status = StatusCodes.Status200OK,
                title = "Registration complete"
            });


            
        }


        // Post Method to Add Admin.

        [HttpPost]
        [Route("register-admin")]

        public async Task<IActionResult> Register_Admin([FromBody] Registration registration)
        {
            var user = await userManager.FindByEmailAsync(registration.Email);
            if (user != null)
                return StatusCode(StatusCodes.Status302Found, new { status=StatusCodes.Status302Found , title = "User Exists" });

            Users newuser = new Users()
            {
                UserName = registration.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = registration.Email,
                PhoneNumber = registration.PhoneNumber.ToString()
            };

            var add_user = await userManager.CreateAsync(newuser, registration.Password);
            if (!add_user.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new { status=StatusCodes.Status408RequestTimeout , title = "Error in register user" });

            if (!await roleManager.RoleExistsAsync(Roles.Admin))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Admin));
            }
            if (!await roleManager.RoleExistsAsync(Roles.Customer))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Customer));
            }
            if (!await roleManager.RoleExistsAsync(Roles.Provider))
            {
                await roleManager.CreateAsync(new IdentityRole(Roles.Provider));
            }

            if (await roleManager.RoleExistsAsync(Roles.Admin))
            {
                await userManager.AddToRoleAsync(newuser, Roles.Admin);
            }
            if (await roleManager.RoleExistsAsync(Roles.Provider))
            {
                await userManager.AddToRoleAsync(newuser, Roles.Provider);
            }
            if (await roleManager.RoleExistsAsync(Roles.Customer))
            {
                await userManager.AddToRoleAsync(newuser, Roles.Customer);
            }

            return Ok(new
            {
                status = StatusCodes.Status200OK,
                title = "Registration complete"
            });
        }


        // post Method to Authenticate User/Provider/Admin.

        [HttpPost]
        [Route("login")]

        public async Task<IActionResult> Login([FromBody] Login login)
        {
            var user = await userManager.FindByNameAsync(login.UserName);
            if (user != null && await userManager.CheckPasswordAsync(user, login.Password))
            {
                var user_role = await userManager.GetRolesAsync(user);

                var authclaim = new List<Claim>()
                    {
                        new Claim("username" ,user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti ,Guid.NewGuid().ToString())
                    };

                foreach (var role in user_role)
                {
                    authclaim.Add(new Claim("roles", role));
                }

                var authSinginKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

/*                var token = new JwtSecurityToken(issuer: configuration["JWT:Validissuer"], audience: configuration["JWT:ValidAudience"], expires: DateTime.Now.AddDays(7).Date, claims: authclaim, signingCredentials: new SigningCredentials(authSinginKey, SecurityAlgorithms.HmacSha256));*/
                var token = new JwtSecurityToken(issuer: configuration["JWT:Validissuer"], audience: configuration["JWT:ValidAudience"], expires: DateTime.UtcNow.AddHours(3), claims: authclaim, signingCredentials: new SigningCredentials(authSinginKey, SecurityAlgorithms.HmacSha256));

                return Ok(new
                {
                    title = "authorized",
                    status = StatusCodes.Status200OK,
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    
                    expiration_year = token.ValidTo.Year,
                    expiration_month = token.ValidTo.Month,
                    expiration_day = token.ValidTo.Day,
                    expiration_hour = token.ValidTo.Hour,
                    expiration_minute = token.ValidTo.Minute,
                    expiration_second = token.ValidTo.Second
                }) ;     


            }
            return Unauthorized(
                new
                {
                    title = "unauthorized",
                    status = StatusCodes.Status401Unauthorized,
                });
        }
    }
}
