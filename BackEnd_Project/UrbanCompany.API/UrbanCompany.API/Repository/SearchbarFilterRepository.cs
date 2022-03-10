using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

using Microsoft.EntityFrameworkCore;

namespace UrbanCompany.API.Repository
{
    public class SearchbarFilterRepository : ISearchbarFilterRepository
    {
        private readonly UrbanCompanyContext context;

        public SearchbarFilterRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }
        public IEnumerable<SearchbarFilter> GetSearchResult(string searchvalue)
        {
            List<SearchbarFilter> result = new List<SearchbarFilter>();
            if(searchvalue != null && searchvalue != "")
            {
                var from_db = context.searchbarFilters.FromSqlRaw("searchresult {0}", searchvalue);
                result.AddRange(from_db);
                foreach(var c in from_db)
                {
                    Console.WriteLine(c.CategoryName);
                }
            }

            return result;
        }
    }
}
