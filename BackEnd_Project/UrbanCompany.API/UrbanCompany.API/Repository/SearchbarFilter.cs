using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;
using Microsoft.EntityFrameworkCore;

namespace UrbanCompany.API.Repository
{
    public class SearchbarFilter : ISearchbarFilter
    {
        private readonly UrbanCompanyContext context;

        public SearchbarFilter(UrbanCompanyContext _context)
        {
            context = _context;
        }
        public IEnumerable<Category> GetSearchResult(string searchvalue)
        {
            List<Category> result = new List<Category>();
            if(searchvalue != null)
            {

                var subservice = context.Categories.Include(s=>s.Services).ThenInclude(ss=>ss.SubServices.Where(ss=>ss.SubServiceName == ));

                var from_subservice = subservice.Where(ss=>ss.)

                var from_service = context.Services.TakeWhile(s => s.ServiceName.Contains(searchvalue));

                var from_category = context.Categories.TakeWhile(s => s.CategoryName.Contains(searchvalue));


            }

            return null;
        }
    }
}
