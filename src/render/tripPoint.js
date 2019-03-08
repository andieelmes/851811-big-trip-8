import {
  convertTimeIntoHoursAndMinutes,
  getHourAndMinutes,
} from '../utils';

import Component from './tripPointComponent';

class TripPoint extends Component {
  constructor(data) {
    super();
    [this._typeDesc, this._typeEmoji] = data.type;
    this._offers = data.offers;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._title = data.title;

    this._onTripPointClick = this._onTripPointClick.bind(this);

    this._onEdit = null;
  }

  get template() {
    return `<article class="trip-point">
    <i class="trip-icon" title="${this._typeDesc}">${this._typeEmoji}</i>
    <h3 class="trip-point__title">${this._title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">
        ${getHourAndMinutes(this._timeStart)}
        &nbsp;&mdash;
        ${getHourAndMinutes(this._timeEnd)}
      </span>
      <span class="trip-point__duration">${convertTimeIntoHoursAndMinutes(this._timeStart, this._timeEnd)}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    <ul class="trip-point__offers">
      ${(this._offers.map((offer) => this._makeTripPointOffer(offer))).join(``)}
    </ul>
  </article>`.trim();
  }

  _onTripPointClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  bind() {
    this._element.addEventListener(`click`, this._onTripPointClick);
  }

  unbind() {
    if (this._element) {
      this._element.removeEventListener(`click`, this._onTripPointClick);
    }
  }

  _makeTripPointOffer([name, price]) {
    return `<li>
      <button class="trip-point__offer">${name} +&euro;&nbsp;${price}</button>
    </li>`;
  }
}

export default TripPoint;
