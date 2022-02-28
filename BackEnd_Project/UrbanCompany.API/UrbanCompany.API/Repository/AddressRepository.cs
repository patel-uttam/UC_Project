using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public class AddressRepository : IAddressRepository
    {
        private readonly UrbanCompanyContext context;

        public AddressRepository(UrbanCompanyContext urbanCompanycontext)
        {
            context = urbanCompanycontext;
        }

        // get list of country
        public IEnumerable<Country> GetCountries()
        {
            return context.Countries.ToList();
        }

        // get to fetch list of state based on country
        public IEnumerable<State> GetStates(int id)
        {
            return context.States.Where(s => s.CountryId == id).ToList();
        }

        // get to fetch list of city based on state
        public IEnumerable<City> GetCities(int id)
        {
            return context.Cities.Where(c=>c.StateId == id).ToList();
        }

        // get to fetch list of area based on city
        public IEnumerable<Area> GetAreas(int id )
        {
            return context.Areas.Where(a=>a.CityId == id).ToList();
        }


        // Add Country
        public bool AddCountry(Country country_value)
        {
            var C = context.Countries.FirstOrDefault(c => c.CountryName == country_value.CountryName);
            if(C == null)
            {
                context.Countries.Add(country_value); 
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        // Add State
        public bool AddState(State state_value)
        {
            var country = context.Countries.FirstOrDefault(c => c.CountryId == state_value.CountryId);
            if (country != null)
            {
                context.States.Add(state_value);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        // Add city
        public bool AddCity(City city_value)
        {
            var S = context.States.FirstOrDefault(s => s.StateId == city_value.StateId);

            if(S != null)
            {
                context.Cities.Add(city_value);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        // Add area
        public bool AddArea(Area area_value)
        {
            var A = context.Cities.FirstOrDefault(c => c.CityId == area_value.CityId);

            if(A != null)
            {
                context.Areas.Add(area_value);
                context.SaveChanges();

                return true;

            }
            else
            {
                return false;
            }
        }



        // to fetch list of Addresses
        public IEnumerable<AddressDisplay> GetAddresses()
        {
            var area = context.Areas.ToList();

            var addresses = new List<AddressDisplay>();

            foreach(var A in area)
            {
                var address = new AddressDisplay();

                var city = context.Cities.FirstOrDefault(c=>c.CityId == A.CityId);
                var state = context.States.FirstOrDefault(s => s.StateId == city.StateId);
                var country = context.Countries.FirstOrDefault(c => c.CountryId == state.CountryId);

                address.Area = A.AreaName;
                address.pincode = A.PinCode;
                address.city = city.CityName;
                address.State = state.StateName;
                address.Country = country.CountryName;

                addresses.Add(address);
            }

            return addresses;
        }

    }
}
