using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface IOrderRepository
    {
        public bool Make_Order(int cust_id, IEnumerable<CartOrder> order_cart , string date , string time , int convenience_fee);
        public bool AddToOrderOngoing(int order_id , IEnumerable<CartOrder> order_cart, IList<int> providers, string date, string time);
        public IEnumerable<OrderDisplay> GetOrderOngoing(int cust_id);

        public void DeleteFromOrderOngoing(IEnumerable<OrderOngoing> orderOngoings);
    }

}
