using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{

    public class CartRepository : ICartRepository
    {
        private readonly UrbanCompanyContext context;

        public CartRepository(UrbanCompanyContext _context)
        {
            context = _context;
        }


        //view cart for customer
        public Boolean AddToCart(int id , Cart cart)
        {
            var category = context.Services.FirstOrDefault(s=>s.ServiceId == cart.Service).CategoryId;
            
            var provider_category = context.Providers.FirstOrDefault(p => p.Category == category).Category;

            var subservice = context.SubServices.Where(s => s.ServiceId == cart.Service).Select(s=>s.SubServiceId).ToList();


            if (cart.Customer == id && category == provider_category && subservice.Contains((int)cart.SubService))
            {
                context.Carts.Add(cart);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }



        public IEnumerable<CartDisplay> GetCart(int id)
        {
            IList<CartDisplay> cart = new List<CartDisplay>();

            var selected_cart_view = context.Carts.Where(c=>c.Customer == id).ToList();
            
            foreach(var c in selected_cart_view)
            {
                CartDisplay cd = new CartDisplay();
                cd.CartId = c.CartId;
                cd.Customer = c.Customer;
                var cat = context.Services.FirstOrDefault(s => s.ServiceId == c.Service).CategoryId;
                cd.Category = cat;
                var ser = context.Services.FirstOrDefault(s => s.ServiceId == c.Service).ServiceName;
                cd.Service = ser;
                var sub_ser = context.SubServices.FirstOrDefault(ss => ss.SubServiceId == c.SubService).SubServiceName;
                cd.SubService = sub_ser;
                cd.Cost = c.Cost;
                cd.Qty = c.Qty;
                cart.Add(cd);
            }
            return cart;
        }

        public void DeleteCart(int Cust_id , int Cart_id)
        {
            var cart_items = context.Carts.Where(c => c.Customer == Cust_id);

            foreach (var i in cart_items)
            {
                if (i.CartId == Cart_id)
                {
                    context.Carts.Remove(i);
                }
            }
            context.SaveChanges();


        }

        public void DeleteCarts(int Cust_id)
        {
            IEnumerable<Cart> Cart_Deletes = context.Carts.Where(c => c.Customer == Cust_id);
            Console.WriteLine(Cust_id);
            foreach(var c_delete in Cart_Deletes)
            {
                context.Carts.Remove(c_delete);
                

            }
            context.SaveChanges();
        }
    }
}
                      






       