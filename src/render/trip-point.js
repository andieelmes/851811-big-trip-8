import moment from 'moment';
import 'moment-duration-format';

import {
  types,
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
    this._onOfferAdd = null;

  }

  get template() {
    const [typeDesc, typeEmoji] = [this._type, types.get(capitalize(this._type))];
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
      ${this._getMaxAvailiableOffers(this._offers)}
    </ul>
  </article>`.trim();
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  set onOfferAdd(fn) {
    this._onOfferAdd = fn;
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

  _convertDataVariables(data) {
    return {
      type: data._type,
      destination: data._destination,
      offers: data._offers,
      price: data._price,
      favorite: data._favorite,
      timeStart: data._timeStart,
      timeEnd: data._timeEnd,
    };
  }

  _onTripPointClick(evt) {
    if (evt.target.closest(`.trip-point__offers`)) {
      return this._onOfferClick(evt);
    } else {
      return typeof this._onEdit === `function` && this._onEdit();
    }
  }

  _getMaxAvailiableOffers(offers) {
    return offers.reduce((availableOffers, offer) => {
      if (!offer.accepted && availableOffers.length < MAX_OFFER_NUMBER) {
        const offerIndex = offers.indexOf(offer);
        availableOffers.push(this._makeTripPointOffer(offer, offerIndex));
      }
      return availableOffers;
    }, []).join(``);
  }

  _makeTripPointOffer(offer, index) {
    return !offer.accepted ? `<li>
        <button class="trip-point__offer" data-index="${index}">${offer.name} +&euro;&nbsp;${offer.price}</button>
      </li>` : ``;
  }

  _onOfferClick(evt) {
    if (!evt.target.classList.contains((`trip-point__offer`))) {
      return false;
    }
    const offerIndex = evt.target.closest(`.trip-point__offer`).getAttribute(`data-index`);
    const chosenOffer = this._offers[offerIndex];
    chosenOffer.accepted = true;
    const newData = Object.assign(this, chosenOffer);

    return typeof this._onOfferAdd === `function` && this._onOfferAdd(this._convertDataVariables(newData));
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
