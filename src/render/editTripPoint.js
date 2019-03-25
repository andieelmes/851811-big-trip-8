import flatpickr from 'flatpickr';
import moment from 'moment';
import {
  getOfferId,
} from '../utils';
import {
  OFFERS,
  TYPES,
  FAVOURITE_ON,
  FLATPICKR_CONFIG,
  ESC_KEYCODE,
  AllTypeToInputLabel,
} from '../constants';
import Component from './tripPointComponent';

class EditTripPoint extends Component {
  constructor(data) {
    super();
    this._allTypes = data.allTypes;
    this._type = data.type;
    this._allOffers = data.allOffers;
    this._offer = data.offer;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._desc = data.desc;
    this._allCitites = data.allCitites;
    this._destination = data.destination;
    this._favorite = data.favorite;
    this._pictures = data.pictures;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onEscPress = this._onEscPress.bind(this);

    this._onSubmit = null;
    this._onDelete = null;
    this._onEsc = null;

    this._onChangeType = this._onChangeType.bind(this);
  }

  get template() {
    const [typeDesc, typeEmoji] = this._type;

    return `
    <article class="point">
      <form action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day">
          </label>

          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">${typeEmoji}</label>

            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${[...this._allTypes].map((type) => this._makeTripPointTypeRadioButton(type, typeDesc)).join(``)}
              </div>
            </div>
          </div>

          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">${AllTypeToInputLabel[typeDesc]}</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
            <datalist id="destination-select">
              ${this._allCitites.map((city) => `<option value="${city}"></option>`).join(``)}
            </datalist>
          </div>

          <label class="point__time" style="margin-right: 0">
            choose time
            <input class="point__input"
              type="text"
              value="${moment(this._timeStart).format(`D MMM h:mm`)}"
              name="timeStart"
              placeholder="00:00 — 00:00">
          </label>
          &nbsp;&mdash;&nbsp;
          <label class="point__time">
            choose time
            <input class="point__input"
              type="text"
              value="${moment(this._timeEnd).format(`D MMM h:mm`)}"
              name="timeEnd"
              placeholder="00:00 — 00:00">
          </label>

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
              ${this._allOffers.map((offerName) => this._makeTripPointOfferCheckbox(offerName, this._offer)).join(``)}
            </div>

          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${this._desc}</p>
            <div class="point__destination-images">
              ${this._pictures.map((pictureSrc) => `<img src="${pictureSrc}" alt="picture from place" class="point__destination-image">`)}
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


  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offer = data.offer;
    this._price = data.price;
    this._favorite = data.favorite;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
  }

  _processForm(formData) {
    const entry = {
      type: [],
      destination: ``,
      price: ``,
      favorite: ``,
      offer: [],
      timeStart: ``,
      timeEnd: ``,
    };

    const editTripPointMapper = EditTripPoint.createMapper(entry);

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

  _makeTripPointOfferCheckbox(offer, chosenOffers) {
    const idName = getOfferId(offer.name);
    const checked = chosenOffers.some((chosenOffer) => chosenOffer.name === offer.name);
    return `<input
      class="point__offers-input visually-hidden"
      type="checkbox"
      id="${idName}"
      name="offer"
      value="${idName}"
      ${checked ? `checked` : ``}
    >
      <label for="${idName}" class="point__offers-label">
        <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>`;
  }

  _makeTripPointTypeRadioButton([typeDesc, typeEmoji], chosenType) {
    const checked = typeDesc === chosenType;
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

  bind() {
    this._element.querySelector(`.point form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`[type=reset]`)
        .addEventListener(`click`, this._onDeleteButtonClick);
    this._element.querySelectorAll(`.travel-way__select-input`).forEach((element) => {
      element.addEventListener(`click`, this._onChangeType);
    });
    document.addEventListener('keydown', this._onEscPress);

    const timeStartPicker = flatpickr(this._element.querySelector(`[name="timeStart"]`), {
      ...FLATPICKR_CONFIG,
      onChange: (dateStr) => {
        timeEndPicker.set(`disable`, [
          (date) => date <= new Date(dateStr)
        ])
      },
    });

    const timeEndPicker = flatpickr(this._element.querySelector(`[name="timeEnd"]`), {
      ...FLATPICKR_CONFIG,
      disable: [
        (date) => date <= new Date(this._timeStart)
      ]
    });
  }

  unbind() {
    if (this._element) {
      this._element.querySelector(`.point form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);
      this._element.querySelector(`[type=reset]`)
        .removeEventListener(`click`, this._onDeleteButtonClick);
      this._element.querySelectorAll(`.travel-way__select-input`).forEach((element) => {
        element.removeEventListener(`click`, this._onChangeType);
      });
      document.removeEventListener('keydown', this._onEscPress);
    }
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);

    this.update(newData);

    return typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _onChangeType() {
    const formData = new FormData(this._element.querySelector(`form`));
    const newData = this._processForm(formData);

    this.update(newData);

    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onDeleteButtonClick() {
    return typeof this._onDelete === `function` && this._onDelete();
  }

  _onEscPress(e) {
    return e.keyCode === ESC_KEYCODE && typeof this._onEsc === `function` && this._onEsc();
  };

  static createMapper(target) {
    return {
      type: (value) => {
        const typeInfo = [...TYPES].find((type) => type[0] === value);
        target.type = typeInfo;
      },
      offer: (value) => {
        const offerInfo = OFFERS.find((offer) => getOfferId(offer.name) === value);
        target.offer.push({name: offerInfo.name, price: offerInfo.price});
      },
      destination: (value) => {
        target.destination = value;
      },
      price: (value) => {
        target.price = value;
      },
      favorite: (value) => {
        target.favorite = value;
      },
      timeStart: (value) => {
        target.timeStart = value;
      },
      timeEnd: (value) => {
        target.timeEnd = value;
      },
    };
  }
}

export default EditTripPoint;
