using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface IReviewRatingRepository
    {
        public bool AddReviewRating(ReviewRating_Adding reviewRating);

        public IEnumerable<ReviewRating> GetReviewRatings(int provider_id);

        public IEnumerable<ReviewRating> GetReviewRatingsAll();
    }
}
