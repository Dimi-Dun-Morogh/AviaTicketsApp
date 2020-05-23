import '../css/style.css';
import locations from './store/locations';
import './plugins';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets'

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  //Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // get data from inputs
    const origin = locations.getCityCodeBykey(formUI.originValue);
    const destination = locations.getCityCodeBykey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    //CODE, CODE, 2019-09, 2019-10
    console.log(origin, destination, depart_date, return_date);
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    console.log(locations)
    ticketsUI.renderTickets(locations.lastSearch)
  }
});
