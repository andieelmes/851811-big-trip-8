import {
  appendToDom,
  getOffersPrice,
} from '../utils';
import {TRIP_INFO_SELECTOR} from '../constants';

const tripInfoElement = document.querySelector(TRIP_INFO_SELECTOR);

const makeTripInfo = (tripPointsDataModel) => {
  const tripPoints = tripPointsDataModel.data;

  const totalPrice = tripPoints.reduce((price, tripPoint) => price + +tripPoint.price + getOffersPrice(tripPoint.offers), 0);

  return `
  <div class="trip__schedule">
    <i class="trip-icon">⛰️</i>
    <h1 class="trip__points">Amsterdam&nbsp;&mdash; Geneva&nbsp;&mdash;  Chamonix</h1>
    <p class="trip__dates">Mar 17&nbsp;&mdash; 19</p>
  </div>
  <p class="trip__total">Total: <span class="trip__total-cost">&euro;&nbsp;${totalPrice}</span></p>`;
};

const renderTripInfo = (tripPoints) => {
  appendToDom({
    newElements: makeTripInfo(tripPoints),
    parentElement: tripInfoElement,
    clear: true,
  });
};

export default renderTripInfo;
