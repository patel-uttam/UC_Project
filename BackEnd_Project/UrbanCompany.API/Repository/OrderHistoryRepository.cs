using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class OrderHistoryRepository : IOrderHistoryRepository
    {
        private readonly UrbanCompanyContext context;
        public OrderHistoryRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }

        public IEnumerable<OrderDisplay> GetOrderHistory(int cust_id)
        {
            List<OrderDisplay> order_display = new List<OrderDisplay>();

            var orders = context.OrderHistories.Where(oh => oh.Customer == cust_id).ToList();
            
            if(orders.Count >0)
            {
                foreach (var o in orders)
                {
                    var order = new OrderDisplay();

                    order.OrderDisplayId = o.OrderHistoryId;
                    order.Customer = o.Customer;
                    order.Provider_First = context.Providers.FirstOrDefault(p => p.ProviderId == o.Provider).FirstName;
                    order.Provider_Last = context.Providers.FirstOrDefault(p => p.ProviderId == o.Provider).LastName;
                    order.Service = context.Services.FirstOrDefault(s => s.ServiceId == o.Service).ServiceName;
                    order.SubService = context.SubServices.FirstOrDefault(ss => ss.SubServiceId == o.SubService).SubServiceName;
                    order.ServiceDate = o.ServiceDate;
                    order.ServiceTime = "";
                    order.Cost = o.Cost;
                    order.Qty = o.Qty;

                    order_display.Add(order);
                }

            }
            return order_display;
        }

        public void AddToOrderHistory(IEnumerable<OrderOngoing> orderOngoings)
        {
            foreach (var og in orderOngoings)
            {
                Models.OrderHistory oh = new Models.OrderHistory();

                oh.OrderId = og.OrderId;
                oh.Customer = og.Customer;
                oh.Service = og.Service;
                oh.SubService = og.SubService;
                oh.ServiceDate = og.ServiceDate;
                oh.Cost = og.Cost;
                oh.Qty = og.Qty;
                context.OrderHistories.Add(oh);
                context.SaveChanges();
            }

        }

        public bool Order_Complete(int cust_id , IEnumerable<OrderOngoing> og)
        {
            var orderIds = og.Select(o => o.Customer).ToList();

            if (og.Select(o=>o.Customer).ToList().Contains(cust_id))
            {
                foreach (var id in orderIds)
                {
                    Order orders;
                    orders = context.Orders.FirstOrDefault(o => o.OrderId == id);
                    orders.OrderStatus = true;
                    context.Update(orders);
                    context.SaveChanges();
                }
                AddToOrderHistory(og);
                return true;
            }
            else
            {
                return false;
            }

        }

    }
}
