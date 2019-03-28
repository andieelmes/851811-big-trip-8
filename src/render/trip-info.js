import {
  appendToDom,
  getOffersPrice,
} from '../utils';
import {TRIP_INFO_SELECTOR} from '../constants';
import makeCity from './make-city';
import tripInfo from '../data/trip-info';

const tripInfoElement = document.querySelector(TRIP_INFO_SELECTOR);

const makeTripInfo = (config, tripPoints) => {
  const {
    cities,
    picture,
    dateStart,
    dateEnd,
  } = config;

  const totalPrice = tripPoints.reduce((price, tripPoint) => price + +tripPoint.price + getOffersPrice(tripPoint.offers), 0);

  return `<div class="trip__schedule">
  <i class="trip-icon"><img src="${picture}" style="border-radius: 50%"/></i>
  <h1 class="trip__points">
  ${cities.map((city, index) => {
    return index === cities.length - 1 ? city : makeCity(city);
  }).join(``)}
  </h1>
  <p class="trip__dates">
  ${new Date(dateStart).toLocaleDateString(`en-gb`, {month: `short`})}&nbsp;
  ${new Date(dateStart).toLocaleDateString(`en-gb`, {day: `2-digit`})}&nbsp;
  &mdash;&nbsp;
  ${new Date(dateEnd).toLocaleDateString(`en-gb`, {day: `2-digit`})}</p>
</div>
<p class="trip__total">Total: <span class="trip__total-cost">&euro;&nbsp;${totalPrice}</span></p>`;
};

const renderTripInfo = (tripPoints) => {
  appendToDom({
    newElements: makeTripInfo(tripInfo(), tripPoints),
    parentElement: tripInfoElement,
    clear: true,
  });
};

export default renderTripInfo;