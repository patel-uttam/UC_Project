using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface IStatisticDataRepository
    {
        public Provider Top_Provider_By_Review(); 
        public Service Most_ordered_Services();
        public int Number_Of_Provider();
        public int Number_Of_Service_Delivered();
        public IEnumerable<int> percentage_of_Categories();
    }
}
