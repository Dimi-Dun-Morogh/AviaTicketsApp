import {
  getDatePickerInstance,
  getAutoCompleteInstance,
} from '../plugins/materialize';
class FormUI {
  constructor(datePickerInstance, autoCompleteInstance) {
    this._form = document.forms['locationControls'];
    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.depart = document.getElementById('datepicker-depart');
    this.return = document.getElementById('datepicker-return');
    this.originAutocomplete = autoCompleteInstance(this.origin);
    this.destinationAutocomplete = autoCompleteInstance(this.destination);
    this.departDatepicker = datePickerInstance(this.depart);
    this.returnDatepicker = datePickerInstance(this.return);
  }
  get form(){
    return this._form;
  }
  get originValue(){
    return this.origin.value;
  }
  get destinationValue(){
    return this.destination.value;
  }
  get departDateValue(){
    return this.departDatepicker.toString()
  }
  get returnDateValue(){
    return this.returnDatepicker.toString()
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}
const formUI = new FormUI(getDatePickerInstance, getAutoCompleteInstance);
export default formUI;
