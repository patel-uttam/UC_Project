using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class StatisticDataRepository : IStatisticDataRepository
    {
        private readonly UrbanCompanyContext context;

        public StatisticDataRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }

        public int Number_Of_Provider()
        {
            var total_providers = context.Providers.Count();

            return total_providers;
        }

        public int Total_Of_All_Order()
        {
            int Total_amount = 0;
            var orders = context.Orders.ToList();
            
            foreach(var o in orders)
            {
                Total_amount += o.TotalCost;
            }
            return Total_amount;
        }

        public int Number_Of_Order_Delivered()
        {
            var orders = context.Providers.Count();
            return orders;
        }

        public IEnumerable<int> percentage_of_Categories()
        {
            throw new NotImplementedException();
        }

        public Provider Top_Provider_By_Review()
        {
            throw new NotImplementedException();
        }

        public Service Most_ordered_Services()
        {
            throw new NotImplementedException();
        }
    }
}
