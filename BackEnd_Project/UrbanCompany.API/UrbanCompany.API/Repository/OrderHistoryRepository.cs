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
        private readonly IOrderRepository orderRepository;
        public OrderHistoryRepository(UrbanCompanyContext _context , IOrderRepository repository)
        {
            context = _context;
            orderRepository = repository;
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
                    order.OrderId = o.OrderId;
                    order.Customer = o.Customer;
                    order.Provider = o.Provider;
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
            var order_ongoing = context.OrderOngoings.Where(oo => oo.OrderId == orderOngoings.Select(o => o.OrderId).First()).ToList();
            foreach (var og in order_ongoing)
            {
                Models.OrderHistory oh = new Models.OrderHistory();

                oh.OrderId = og.OrderId;
                oh.Customer = og.Customer;
                oh.Provider = og.Provider;
                oh.Service = og.Service;
                oh.SubService = og.SubService;
                oh.ServiceDate = og.ServiceDate;
                oh.DeliveryAddress = og.DeliveryAddress;
                oh.Cost = og.Cost;
                oh.Qty = og.Qty;
                context.OrderHistories.Add(oh);
                context.SaveChanges();
            }

        }

        public bool Order_Complete(int orderId)
        {
            var ongoing_order = context.OrderOngoings.Where(og => og.OrderId == orderId).ToList();
            if (ongoing_order.Count>0)
            {
                Order orders;
                orders = context.Orders.FirstOrDefault(o => o.OrderId == orderId);
                orders.OrderStatus = true;
                context.Update(orders);
                context.SaveChanges();

                AddToOrderHistory(ongoing_order);
                orderRepository.DeleteFromOrderOngoing(ongoing_order);
                return true;
            }
            else
            {
                return false;
            }

        }

    }
}
