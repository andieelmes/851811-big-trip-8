import flatpickr from 'flatpickr';
import moment from 'moment';
import nanoid from 'nanoid';

import {
  getOfferId,
  capitalize,
  escapeHtml,
} from '../utils';
import {
  types,
  FAVOURITE_ON,
  FAVOURITE_OFF,
  FLATPICKR_CONFIG,
  ESC_KEYCODE,
  AllTypeToInputLabel,
} from '../constants';
import Component from './trip-point-component';

class EditTripPoint extends Component {
  constructor(data, destinations = []) {
    super();
    this._id = data.id;
    this._type = data.type;
    this._offers = data.offers;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._desc = data.desc;
    this._destination = data.destination;
    this._favorite = data.favorite;
    this._pictures = data.pictures;
    this._destinations = destinations;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onChangeTypeBtnClick = this._onChangeTypeBtnClick.bind(this);
    this._onChangeDestinationBtnClick = this._onChangeDestinationBtnClick.bind(this);

    this._onSubmit = null;
    this._onDelete = null;
    this._onEsc = null;
    this._onClickOutside = null;
    this._onChangeType = null;
    this._onChangeDestination = null;
  }

  get template() {
    const [typeDesc, typeEmoji] = [this._type, types.get(capitalize(this._type))];

    return `
    <article class="point">
      <form action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input
              readonly
              class="point__input"
              type="text"
              placeholder="${moment(this._timeStart).format(`MMM DD`)}"
              name="day"
              value="${moment(this._timeStart).format(`MMM DD`)}"
            >
          </label>

          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">${typeEmoji}</label>

            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${[...types].map((type) => this._makeTripPointTypeRadioButton(type, typeDesc)).join(``)}
              </div>
            </div>
          </div>

          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">${AllTypeToInputLabel[typeDesc.toUpperCase()]}</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
            <datalist id="destination-select">
              ${this._makeDestinationsDatalist(this._destinations)}
            </datalist>
          </div>

          <div class="point__time">
            choose time
            <input class="point__input"
              type="text"
              value="${moment(this._timeStart).unix()}"
              name="date-start"
              placeholder="19:00"
            >
            <input class="point__input"
              type="text"
              value="${moment(this._timeEnd).unix()}"
              name="date-end"
              placeholder="21:00"
            >
          </div>

          <label class="point__price">
            write price
            <span class="point__price-currency">€</span>
            <input class="point__input" type="text" value="${this._price}" name="price">
          </label>

          <div class="point__buttons">
            <button class="point__button point__button--save" type="submit">Save</button>
            <button class="point__button" type="reset">Delete</button>
          </div>

          <div class="paint__favorite-wrap">
            <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._favorite === FAVOURITE_ON ? `checked` : ``}>
            <label class="point__favorite" for="favorite">favorite</label>
          </div>
        </header>

        <section class="point__details">
          <section class="point__offers">
            <h3 class="point__details-title">offers</h3>

            <div class="point__offers-wrap">
              ${this._offers.map((offer, index) => this._makeTripPointOfferCheckbox(offer, index)).join(``)}
            </div>

          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${this._desc}</p>
            <div class="point__destination-images">
              ${this._pictures.map((picture) => `<img src="${picture.src}" alt="${picture.description} class="point__destination-image">`).join(``)}
            </div>
          </section>
          <input type="hidden" class="point__total-price" name="total-price" value="">
        </section>
      </form>
    </article>`.trim();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onEsc(fn) {
    this._onEsc = fn;
  }

  set onClickOutside(fn) {
    this._onClickOutside = fn;
  }

  set onChangeType(fn) {
    this._onChangeType = fn;
  }

  set onChangeDestination(fn) {
    this._onChangeDestination = fn;
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._desc = data.desc;
    this._offers = data.offers;
    this._price = data.price;
    this._favorite = data.favorite;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
  }

  shake() {
    return new Promise((resolve) => {
      const onShake = () => {
        this._element.removeEventListener(`animationend`, onShake);
        this._element.classList.remove(`shake`);
        resolve();
      };
      this._element.classList.add(`shake`);
      this._element.addEventListener(`animationend`, onShake);
    });
  }

  makeRedBorder() {
    this._element.style.border = `1px solid red`;
  }

  blockSubmitting() {
    this._element.style.border = `none`;
    this._element.querySelector(`form`).disabled = true;
    this._element.querySelector(`[type=reset]`).disabled = true;
    this._element.querySelector(`.point__button--save`).disabled = true;
    this._element.querySelector(`.point__button--save`).textContent = `Saving...`;
  }

  blockDeleting() {
    this._element.style.border = `none`;
    this._element.querySelector(`form`).disabled = true;
    this._element.querySelector(`.point__button--save`).disabled = true;
    this._element.querySelector(`[type=reset]`).disabled = true;
    this._element.querySelector(`[type=reset]`).textContent = `Deleting...`;
  }

  unBlock() {
    this._element.querySelector(`form`).disabled = false;
    this._element.querySelector(`.point__button--save`).disabled = false;
    this._element.querySelector(`.point__button--save`).textContent = `Save`;
    this._element.querySelector(`[type=reset]`).disabled = false;
    this._element.querySelector(`[type=reset]`).textContent = `Delete`;
  }

  _createMapper(target) {
    return {
      type: (value) => {
        target.type = value;
      },
      offer: (value) => {
        this._offers[value].accepted = true;
        target.offers = this._offers;
      },
      destination: (value) => {
        target.destination = escapeHtml(value);
      },
      price: (value) => {
        target.price = escapeHtml(value);
      },
      favorite: (value) => {
        target.favorite = value === FAVOURITE_ON || FAVOURITE_OFF;
      },
      [`date-start`]: (value) => {
        target.timeStart = value * 1000;
      },
      [`date-end`]: (value) => {
        target.timeEnd = value * 1000;
      },
    };
  }

  _processForm(formData) {
    const entry = {
      type: [],
      destination: ``,
      price: ``,
      favorite: ``,
      offers: [],
      timeStart: ``,
      timeEnd: ``,
    };

    const editTripPointMapper = this._createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (editTripPointMapper[property]) {
        editTripPointMapper[property](value);
      }
    }

    return entry;
  }

  _partialUpdate() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.template;
    this._element.innerHTML = ``;
    this._element.appendChild(newElement.querySelector(`form`));
  }

  _makeTripPointOfferCheckbox(offer, index) {
    const idName = getOfferId(offer.name);
    const checked = offer.accepted;
    const idSuffix = nanoid();
    return `<input
      class="point__offers-input visually-hidden"
      type="checkbox"
      id="${idName}-${idSuffix}"
      name="offer"
      value="${index}"
      ${checked ? `checked` : ``}
    >
      <label for="${idName}-${idSuffix}" class="point__offers-label">
        <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>`;
  }

  _makeTripPointTypeRadioButton([typeDesc, typeEmoji], chosenType) {
    const checked = typeDesc === capitalize(chosenType);
    return `<input
      class="travel-way__select-input
      visually-hidden"
      type="radio"
      id="${typeDesc}"
      name="type"
      value="${typeDesc}"
      ${checked ? `checked` : ``}
    >
    <label class="travel-way__select-label" for="${typeDesc}">${typeEmoji} ${typeDesc}</label><br>`;
  }

  _makeDestinationsDatalist(destinations) {
    return destinations.map((destination) => this._makeDestinationsOption(destination)).join(``);
  }

  _makeDestinationsOption(destination) {
    return `<option value="${destination.name}">`;
  }

  bind() {
    this._element.querySelector(`.point form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`[type=reset]`)
        .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelectorAll(`[name=type]`).forEach((element) => {
      element.addEventListener(`change`, this._onChangeTypeBtnClick);
    });
    this._element.querySelector(`[name=destination]`)
        .addEventListener(`change`, this._onChangeDestinationBtnClick);

    document.addEventListener(`keydown`, this._onEscPress);

    flatpickr(this._element.querySelector(`[name="date-start"]`), Object.assign({
      onChange: (dateStr) => {
        this._element.querySelector(`[name=day]`).value = moment(new Date(dateStr)).format(`MMM DD`);
        timeEndPicker.set(`disable`, [
          (date) => moment(date).startOf(`day`) < moment(new Date(dateStr)).startOf(`day`)
        ]);
      },
    }, FLATPICKR_CONFIG));

    const timeEndPicker = flatpickr(this._element.querySelector(`[name="date-end"]`), Object.assign({
      disable: [
        (date) => moment(date).startOf(`day`) < moment(this._timeStart).startOf(`day`)
      ]
    }, FLATPICKR_CONFIG));

  }

  unbind() {
    if (this._element) {
      this._element.querySelector(`.point form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);
      this._element.querySelector(`[type=reset]`)
        .removeEventListener(`click`, this._onDeleteButtonClick);
      this._element.querySelectorAll(`[name=type]`).forEach((element) => {
        element.removeEventListener(`change`, this._onChangeTypeBtnClick);
      });
      this._element.querySelector(`[name=destination]`)
        .removeEventListener(`change`, this._onChangeDestinationBtnClick);

      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    this._offers = this._offers.map((offer) => {
      return {
        name: offer.name,
        price: offer.price,
        accepted: false,
      };
    });

    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);

    newData.offers = newData.offers.length ? newData.offers : this._offers;

    this.update(newData);

    return typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _onChangeTypeBtnClick() {
    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);

    this.update(newData);

    if (typeof this._onChangeType === `function`) {
      this._onChangeType(newData);
    }

    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeDestinationBtnClick() {
    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);

    this.update(newData);

    if (typeof this._onChangeDestination === `function`) {
      this._onChangeDestination(newData);
    }

    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onDeleteButtonClick() {
    return typeof this._onDelete === `function` && this._onDelete({id: this._id});
  }

  _onEscPress(evt) {
    return evt.keyCode === ESC_KEYCODE && typeof this._onEsc === `function` && this._onEsc();
  }
}

export default EditTripPoint;
