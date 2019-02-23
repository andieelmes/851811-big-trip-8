import {
  populateDom,
  getRandomInt,
  getRandomElements,
} from '../utils';
import makeTripPointOffer from './trip-offer';

import tripPointMocks from '../data/tripPoints';
import allOffers from '../data/offers';

import {
  MIN_OFFER_NUMBER,
  MAX_OFFER_NUMBER,
} from '../constants';

const tasksElement = document.querySelector(`.trip-day__items`);

const makeTripPointOffers = (offers) => offers.map((offer) => makeTripPointOffer(offer)).join(``);

const makeTripPoint = (config) => {
  const {
    icon,
    title,
    timeStart,
    timeEnd,
    duration,
    price,
  } = config;

  const offers = getRandomElements(allOffers, getRandomInt(MIN_OFFER_NUMBER, MAX_OFFER_NUMBER));

  return `<article class="trip-point">
    <i class="trip-icon">${icon}</i>
    <h3 class="trip-point__title">${title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${timeStart}&nbsp;&mdash; ${timeEnd}</span>
      <span class="trip-point__duration">${duration}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${price}</p>
    <ul class="trip-point__offers">
      ${makeTripPointOffers(offers)}
    </ul>
  </article>`;
};

const renderTripPoints = (numberOfTripPoints = tripPointMocks.length) => {
  const mockArray = tripPointMocks.slice(0, numberOfTripPoints);
  populateDom(mockArray, tasksElement, makeTripPoint, true);
};

export default renderTripPoints;
