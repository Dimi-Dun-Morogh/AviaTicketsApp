import '../css/style.css';
import locations from './store/locations';
import './plugins';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
import favTickets from './store/favourites';
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  const ticketsSection = document.querySelector('.tickets-sections');
  const dropdDownTrig = document.querySelector('.dropdown-trigger')
  const dropdown = document.getElementById('dropdown1');
  //Events

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  });
dropdown.addEventListener('click',(e)=>{
  if(e.target.classList.contains('delete-favorite')){
    console.log(e.target.parentNode.parentNode)
    favTickets.deleteFavTicket(e.target)
    let id = e.target.dataset.uniq;
    delete favTickets.favourites[id];
    dropdDownTrig.innerHTML = `Favorites - ${Object.keys(favTickets.favourites).length}`
    var instance = M.Dropdown.getInstance(dropdDownTrig);
    instance.recalculateDimensions();
  }
})
  ticketsSection.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-favorite')) {
      let id = e.target.dataset.uniq;
      let ticketToFav = locations.getTicketByUniqId(id);
      if(favTickets.favourites[id] ===undefined){
        favTickets.favourites[id] = ticketToFav;
        let ticketTemplate = favTickets.favoriteTicketTemplate(ticketToFav);
        dropdown.insertAdjacentHTML('afterbegin',ticketTemplate)
        dropdDownTrig.innerHTML = `Favorites - ${Object.keys(favTickets.favourites).length}`
      }

      // favTickets.renderTicket(ticketTemplate);



    }
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
    
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    console.log(locations);
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
