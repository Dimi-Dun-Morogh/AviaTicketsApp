import api from '../services/apiService';
import {formatDate} from '../helpers/date'
class Locations {
  constructor(api,helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = {};
    this.lastSearch = {};
    this.formatDate = helpers.formatDate;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);
    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    //console.log(this.cities);
    return response;
  }

  createShortCitiesList(cities) {
    //{'City,country':null}
    return Object.entries(cities).reduce((acc, [, city]) => {
      //console.log(key)
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    //{ 'Country code':{...} }
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    //{'City name, Country name': {...}}
    return cities.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code);
      const full_name = `${
        city.name || city.name_translations['en']
      },${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }
  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  getCityCodeBykey(key) {
    const city = Object.values(this.cities).find(
      (item) => item.full_name === key,
    );
    return city.code;
  }
  getAirlineNameByCode(code) {
    return this.airlines[code].name ? this.airlines[code].name : '';
  }
  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }
  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map(ticket => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at,'dd MMM yyyy hh:mm'),
        return_at: this.formatDate(ticket.return_at,'dd MMM yyyy hh:mm')
      };
    });
  }
  async fetchTickets(params) {
    const response = await this.api.prices(params);
    console.log(response)
    this.lastSearch = this.serializeTickets(response.data);
    console.log(this.lastSearch);
  }
}
const locations = new Locations(api,{ formatDate});
export default locations;
