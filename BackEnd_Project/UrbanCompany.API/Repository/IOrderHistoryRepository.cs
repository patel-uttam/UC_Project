using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface IOrderHistoryRepository
    {
       
        public void AddToOrderHistory(IEnumerable<OrderOngoing> orderOngoings);
        public IEnumerable<OrderDisplay> GetOrderHistory(int cust_id);
        public bool Order_Complete(int cust_id , IEnumerable<OrderOngoing> orderOngoings);

    }

}
