using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly UrbanCompanyContext context;
        private readonly IProviderRepository providerRepository;
        private readonly ICartRepository cartRepository;

        public OrderRepository(UrbanCompanyContext _context)
        {
            context = _context;
            providerRepository = new ProviderRepository(_context);
            cartRepository = new CartRepository(_context);
        }


        public bool Make_Order(int id,IEnumerable<CartDisplay> cart ,string date , string time,int convenience_fee)
        {
            string CustomerAddress;
            int TotalValue=convenience_fee;
            bool iscomplete = false;

            if (cart.All(c => c.Customer == id))
            {
                CustomerAddress = context.Customers.FirstOrDefault(c => c.CustomerId == id).CustomerCity;
                int category_id = (int)cart.Select(c => c.Category).First();

                var providers = providerRepository.GetProviderByCategory_City(category_id, CustomerAddress).Select(p => p.ProviderId).ToList();

                if (providers.Count > 0) 
                {
                    Order order = new Order();

                    foreach (var c in cart)
                    {
                        TotalValue = TotalValue + c.Cost;
                    }
                    
                    order.Customer = cart.First(c => c.Customer == id).Customer;
                    order.TotalCost = TotalValue;
                    order.OrderStatus = false;
                    context.Orders.Add(order);
                    context.SaveChanges();
                    Console.WriteLine(order.OrderId);


                    // add to order_ongoing                

                    AddToOrderOngoing(order.OrderId, cart, providers , date, time);

                    // Delete from cart
                    foreach(var c_delete in cart)
                    {
                        cartRepository.DeleteCart(id, c_delete.CartId);

                    }

                    iscomplete = true;

                }
 
            }
            return iscomplete;
        }


        public IEnumerable<OrderDisplay> GetOrderOngoing(int cust_id)
        {
            List<OrderDisplay> order_display = new List<OrderDisplay>();

            var orders = context.OrderOngoings.Where(og => og.Customer == cust_id).ToList();

            if(orders.Count > 0)
            {
                foreach (var o in orders)
                {
                    var order = new OrderDisplay();

                    order.OrderDisplayId = o.OrderOngoingId;
                    order.Customer = o.Customer;
                    order.Provider_First = context.Providers.FirstOrDefault(p => p.ProviderId == o.Provider).FirstName;
                    order.Provider_Last = context.Providers.FirstOrDefault(p => p.ProviderId == o.Provider).LastName;
                    order.Service = context.Services.FirstOrDefault(s => s.ServiceId == o.Service).ServiceName;
                    order.SubService = context.SubServices.FirstOrDefault(ss => ss.SubServiceId == o.SubService).SubServiceName;
                    order.ServiceDate = o.ServiceDate;
                    order.ServiceTime = o.ServiceTime;
                    order.Cost = o.Cost;
                    order.Qty = o.Qty;

                    order_display.Add(order);
                }
            }

            return order_display;

        }

        public bool AddToOrderOngoing(int order_id, IEnumerable<CartDisplay> cart, IList<int> providers , string date, string time)
        {
            bool iscomplete = false;

            foreach (var c in cart)
            {
                OrderOngoing og = new OrderOngoing();

                og.OrderId = order_id;
                og.Customer = c.Customer;

                var num_of_providers = providers.Count;
                var rnd = new Random();
                og.Provider = providers[rnd.Next(0, num_of_providers)];
                while (!providers.Contains((int)og.Provider))
                {
                    og.Provider = providers[rnd.Next(providers.Min(), providers.Max())];
                }

                og.Service = (int)context.Services.FirstOrDefault(ss => ss.ServiceName == c.Service).ServiceId;
                og.SubService = (int)context.SubServices.FirstOrDefault(ss => ss.SubServiceName == c.SubService).SubServiceId;
                og.ServiceDate = date;
                og.ServiceTime = time;
                og.Cost = c.Cost;
                og.Qty = c.Qty;

                if(og.Customer != null && og.Provider != null && og.Service != null && og.SubService != null && og.ServiceDate != null && og.ServiceTime != null && og.Qty != null)
                {
                    context.OrderOngoings.Add(og);
                    context.SaveChanges();
                    iscomplete = true;
                }
            }
            return iscomplete;
        }
    }
}