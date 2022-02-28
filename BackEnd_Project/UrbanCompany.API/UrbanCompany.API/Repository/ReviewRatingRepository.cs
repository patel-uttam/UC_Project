using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class ReviewRatingRepository : IReviewRatingRepository
    {
        private readonly UrbanCompanyContext context;

        public ReviewRatingRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }
        public bool AddReviewRating(ReviewRating_Adding review_rating)
        {
            var customer = context.Customers.FirstOrDefault(c => c.CustomerId == review_rating.CustomerId);
            var provider = context.Providers.FirstOrDefault(p => p.ProviderId == review_rating.ProviderId);
            var service = context.Services.FirstOrDefault(s => s.ServiceId == (context.Services.FirstOrDefault(s=>s.ServiceName == review_rating.Service).ServiceId));
            var subservice = context.SubServices.FirstOrDefault(ss => ss.SubServiceId == (context.SubServices.FirstOrDefault(s => s.SubServiceName== review_rating.SubService).SubServiceId));

            if( customer != null && provider != null && service != null && subservice != null)
            {
                var reviewAndrating = new ReviewRating();
                reviewAndrating.Rating = review_rating.Rating;
                reviewAndrating.Review = review_rating.Review;
                reviewAndrating.CustomerId = review_rating.CustomerId;
                reviewAndrating.ProviderId = review_rating.ProviderId;
                reviewAndrating.OrderHistoryId = review_rating.OrderHistoryId;
                reviewAndrating.ServiceId = service.ServiceId;
                reviewAndrating.SubServiceId = subservice.SubServiceId;

                context.ReviewRatings.Add(reviewAndrating);
                context.SaveChanges();

                var provider_count = context.ReviewRatings.Where(p=>p.ProviderId == review_rating.ProviderId).Count();

                if(provider.Rating != null)
                {
                    provider.Rating = (provider.Rating + review_rating.Rating)/provider_count;
                }
                else
                {
                    provider.Rating = review_rating.Rating;
                }    

                context.Providers.Update(provider);
                context.SaveChanges();

                var service_count = context.ReviewRatings.Where(s => s.ServiceId == service.ServiceId).Count();
                
                if(service.Rating != null)
                {
                    service.Rating = (service.Rating + review_rating.Rating)/service_count;
                }
                else
                {
                    service.Rating = review_rating.Rating;
                }

                context.Services.Update(service);
                context.SaveChanges();

                var subservice_count = context.ReviewRatings.Where(ss => ss.SubServiceId == subservice.SubServiceId).Count();

                if(subservice.Rating != null)
                {
                    subservice.Rating = (subservice.Rating + review_rating.Rating)/subservice_count;
                }
                else
                {
                    subservice.Rating = review_rating.Rating;
                }

                context.SubServices.Update(subservice);
                context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<ReviewRating> GetReviewRatings(int provider_id)
        {
            return context.ReviewRatings.Where(rr => rr.ProviderId == provider_id).ToList();
        }

        public IEnumerable<ReviewRating> GetReviewRatingsAll()
        {
            return context.ReviewRatings.ToList();
        }
    }
}
