import currencyUI from '../views/currency';
class FavTickets {
constructor(currency){
  this.favourites = {},
  this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
}
favoriteTicketTemplate(ticket){
  return `
  <div class="favorite-item  d-flex align-items-start">
  <img
    src="${ticket.airline_logo}"
    class="favorite-item-airline-img"
  />
  <div class="favorite-item-info d-flex flex-column">
    <div
      class="favorite-item-destination d-flex align-items-center"
    >
      <div class="d-flex align-items-center mr-auto">
        <span class="favorite-item-city">${ticket.origin_name}</span>
        <i class="medium material-icons">flight_takeoff</i>
      </div>
      <div class="d-flex align-items-center">
        <i class="medium material-icons">flight_land</i>
        <span class="favorite-item-city">${ticket.destination_name}</span>
      </div>
    </div>
    <div class="ticket-time-price d-flex align-items-center">
      <span class="ticket-time-departure">${ticket.departure_at}</span>
      <span class="ticket-price ml-auto">${this.getCurrencySymbol()}${ticket.price}</span>
    </div>
    <div class="ticket-additional-info">
      <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
      <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
    </div>
    <a data-uniq=${ticket.unique_ID}
      class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
      >Delete</a
    >
  </div>
</div>
  `
}
renderTickets(){
  const dropdown = document.getElementById('dropdown1');
  //dropdown.innerHTML = '';
  let content = ''
  Object.entries(this.favourites).forEach(([key,value])=>{
    const template = this.favoriteTicketTemplate(value);
    content+=template
  })
  //dropdown.innerHTML= content;
   dropdown.insertAdjacentHTML('afterbegin',content);
}
deleteFavTicket(elem){
  elem.parentNode.parentNode.innerHTML=''
}
}
const favTickets = new FavTickets(currencyUI);
export default favTickets;