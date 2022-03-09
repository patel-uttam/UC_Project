using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface ISearchbarFilter
    {
        public IEnumerable<Category> GetSearchResult(string searchvalue);
    }
}
