using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Repository;
using UrbanCompany.API.Models;
using Microsoft.AspNetCore.Authorization;
using UrbanCompany.API.Authentication;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrbanCompany.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewRatingController : ControllerBase
    {
        private readonly IReviewRatingRepository reviewRatingRepository;

        public ReviewRatingController(IReviewRatingRepository repository)
        {
            reviewRatingRepository = repository;
        }

        // GET: api/<ReviewRatingController>
        [HttpGet]
        public IEnumerable<ReviewRating> Get()
        {
            return reviewRatingRepository.GetReviewRatingsAll();
        }

        // GET api/<ReviewRatingController>/5
        [HttpGet("{id}")]
        public IEnumerable<ReviewRating> Get(int id)
        {
            return reviewRatingRepository.GetReviewRatings(id);
        }

        // POST api/<ReviewRatingController>
        [Authorize(Roles = Roles.Customer)]
        [HttpPost("addnew")]
        public bool Post([FromBody] ReviewRating_Adding reviewRating)
        {
            return reviewRatingRepository.AddReviewRating(reviewRating);
        }

    }
}
