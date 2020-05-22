import api from '../services/apiService';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList= null;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
    ]);
    const [countries, cities] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities)
    return response;
  }

  createShortCitiesList(cities){
    //{'City,country':null}
    return Object.entries(cities).reduce((acc,[key])=>{
//console.log(key)
acc[key] = null;
return acc;
    },{})
  }

  serializeCountries(countries) {
    //{ 'Country code':{...} }
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities){
    //{'City name, Country name': {...}}
    return cities.reduce((acc,city)=>{
      const country_name = this.getCountryNameByCode(city.country_code);
      const key = `${city.name || city.name_translations['en']},${country_name}`;
      acc[key] = city;
      return acc;
    },{})
  }

  getCountryNameByCode(code){
    return this.countries[code].name;
  }


  getCityCodeBykey(key){
    return this.cities[key].code
  }
  async fetchTickets(params){
    const response = await this.api.prices(params);
    console.log(response);
  }
}
const locations = new Locations(api);
export default locations;
