import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

//Init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select,{
  classes:'selectrino'
});

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}
//Init Autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
  data: {
    Apple: null,
    Microsoft: null,
    Google: 'https://placehold.it/250x250',
  },
});

export function getAutoCompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

//Init Datepicker
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'yyyy-mm',
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}

//Init dropdown

const dropdown = document.querySelector('.dropdown-trigger');
M.Dropdown.init(dropdown, {

  closeOnClick: false,
  // hover:true,
  onCloseEnd(){
   // console.log('closed')

  }
});
