import {getHourAndMinutes} from '../utils';
import Component from './tripPointComponent';
import makeTripPointOfferCheckbox from '../render/tripOfferCheckbox';
import makeTripPointTypeCheckbox from '../render/tripTypeCheckbox';

class EditTripPoint extends Component {
  constructor(data) {
    super();
    this._allTypes = data.allTypes;
    [this._typeDesc, this._typeEmoji] = data.type;
    this._allOffers = data.allOffers;
    this._offers = data.offers;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._desc = data.desc;
    this._allCitites = data.allCitites;
    this._title = data.title;
    this._pictures = data.pictures;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetButtonClick = this._onResetButtonClick.bind(this);

    this._onSubmit = null;
    this._onReset = null;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
  }

  _onResetButtonClick() {
    return typeof this._onReset === `function` && this._onReset();
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onReset(fn) {
    this._onReset = fn;
  }

  get template() {
    return `
    <article class="point">
      <form action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day">
          </label>

          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">${this._typeEmoji}</label>

            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${[...this._allTypes].map((type) => makeTripPointTypeCheckbox(type)).join(``)}
              </div>

              <div class="travel-way__select-group">
                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

                <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
              </div>
            </div>
          </div>

          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">Flight to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._title}" name="destination">
            <datalist id="destination-select">
              ${this._allCitites.map((city) => `<option value="${city}"></option>`).join(``)}
            </datalist>
          </div>

          <label class="point__time">
            choose time
            <input class="point__input"
              type="text"
              value="${getHourAndMinutes(this._timeStart)}&nbsp;&mdash;${getHourAndMinutes(this._timeEnd)}"
              name="time"
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
            <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
            <label class="point__favorite" for="favorite">favorite</label>
          </div>
        </header>

        <section class="point__details">
          <section class="point__offers">
            <h3 class="point__details-title">offers</h3>

            <div class="point__offers-wrap">
              ${this._allOffers.map((offerName) => makeTripPointOfferCheckbox(offerName, this._offers)).join(``)}
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

  bind() {
    this._element.querySelector(`.point form`)
        .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`[type=reset]`)
        .addEventListener(`click`, this._onResetButtonClick);
  }

  unbind() {
    if (this._element) {
      this._element.querySelector(`.point form`)
        .removeEventListener(`submit`, this._onSubmitButtonClick);
      this._element.querySelector(`[type=reset]`)
        .removeEventListener(`click`, this._onResetButtonClick);
    }
  }

}

export default EditTripPoint;
