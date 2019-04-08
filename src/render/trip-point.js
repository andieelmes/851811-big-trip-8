import moment from 'moment';
import 'moment-duration-format';

import {
  TYPES,
  MAX_OFFER_NUMBER,
} from '../constants';

import {
  capitalize,
  getOffersPrice
} from '../utils';

import Component from './trip-point-component';

class TripPoint extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._offers = data.offers;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._destination = data.destination;
    this._favorite = data.favorite;

    this._onTripPointClick = this._onTripPointClick.bind(this);

    this._onEdit = null;

  }

  get template() {
    const [typeDesc, typeEmoji] = [this._type, TYPES.get(capitalize(this._type))];
    const totalPrice = getOffersPrice(this._offers) + +this._price;

    return `<article class="trip-point">
    <i class="trip-icon" title="${typeDesc}">${typeEmoji}</i>
    <h3 class="trip-point__title">${this._destination}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">
        ${moment(this._timeStart).format(`D MMM HH:mm`)}
        &nbsp;&mdash;
        ${moment(this._timeEnd).format(`D MMM HH:mm`)}
      </span>
      <span class="trip-point__duration">${moment.duration(moment(this._timeEnd).diff(this._timeStart), `milliseconds`).format(`d[D] h[H] m[M]`)}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${totalPrice}</p>
    <ul class="trip-point__offers">
      ${this._getMaxAcceptedOffers(this._offers)}
    </ul>
  </article>`.trim();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._offers = data.offers;
    this._price = data.price;
    this._favorite = data.favorite;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
  }

  _onTripPointClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  _getMaxAcceptedOffers(offers) {
    return offers.reduce((acceptedOffers, offer) => {
      if (offer.accepted && acceptedOffers.length < MAX_OFFER_NUMBER) {
        acceptedOffers.push(this._makeTripPointOffer(offer));
      }
      return acceptedOffers;
    }, []).join(``);
  }

  _makeTripPointOffer(offer) {
    return offer.accepted ? `<li>
        <button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button>
      </li>` : ``;
  }

  bind() {
    this._element.addEventListener(`click`, this._onTripPointClick);
  }

  unbind() {
    if (this._element) {
      this._element.removeEventListener(`click`, this._onTripPointClick);
    }
  }
}

export default TripPoint;
