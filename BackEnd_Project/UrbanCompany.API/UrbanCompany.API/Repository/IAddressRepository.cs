using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UrbanCompany.API.Models;

namespace UrbanCompany.API.Repository
{
    public interface IAddressRepository
    {
        // get countries
        public IEnumerable<Country> GetCountries();

        // get country base states
        public IEnumerable<State> GetStates(int id);
        
        // state base cities
        public IEnumerable<City> GetCities(int id);

        // City base areas
        public IEnumerable<Area> GetAreas(int id);


        // Add country
        public bool AddCountry(Country country);

        // Add State
        public bool AddState(State state);

        // Add city
        public bool AddCity(City city);

        // Add City base areasz
        public bool AddArea(Area area);


        // Add full Address to Display
        public IEnumerable<AddressDisplay> GetAddresses();
    }
}
