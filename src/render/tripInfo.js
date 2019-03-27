import {appendToDom} from '../utils';
import {TRIP_INFO_SELECTOR} from '../constants';
import makeCity from './makeCity';
import tripInfo from '../data/tripInfo';

const tripInfoElement = document.querySelector(TRIP_INFO_SELECTOR);

const makeTripInfo = (config, tripPoints) => {
  const {
    cities,
    picture,
    dateStart,
    dateEnd,
  } = config;

  const totalPrice = tripPoints.reduce((acc, tripPoint) => acc + +tripPoint.price + tripPoint.offer.reduce((price, current) => price + +current.price, 0), 0);

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
