using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface ISearchbarFilterRepository
    {
        public IEnumerable<SearchbarFilter> GetSearchResult(string searchvalue);
    }
}
