import {
  populateDom,
  getRandomInt,
  coverTimeIntoHoursAndMinutes,
} from '../utils';
import {
  TRIP_POINTS_SELECTOR,
  MIN_NUMBER_OF_TRIP_POINTS,
  MAX_NUMBER_OF_TRIP_POINTS,
} from '../constants';
import makeTripPointOffer from './trip-offer';
import tripPoint from '../data/tripPoint';

const tripPointsElement = document.querySelector(TRIP_POINTS_SELECTOR);
const defaultNumberOfTripPoints = getRandomInt(MIN_NUMBER_OF_TRIP_POINTS, MAX_NUMBER_OF_TRIP_POINTS);

const makeTripPoint = (config) => {
  const {
    icon,
    offers,
    timeStart,
    timeEnd,
    price,
    desc,
  } = config;

  const [iconTitle, emoji] = icon;
  const duration = (timeEnd - timeStart);
  return `<article class="trip-point">
    <i class="trip-icon" title="${iconTitle}">${emoji}</i>
    <h3 class="trip-point__title">${desc}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">
      ${new Date(timeStart).toLocaleTimeString(`en-gb`, {hour: `2-digit`, minute: `2-digit`})}
      &nbsp;&mdash;
      ${new Date(timeEnd).toLocaleTimeString(`en-gb`, {hour: `2-digit`, minute: `2-digit`})}</span>
      <span class="trip-point__duration">${coverTimeIntoHoursAndMinutes(duration)}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${price}</p>
    <ul class="trip-point__offers">
      ${(offers.map((offer) => makeTripPointOffer(offer))).join(``)}
    </ul>
  </article>`;
};

const renderTripPoints = (numberOfTripPoints = defaultNumberOfTripPoints) => {
  const tripPoints = new Array(+numberOfTripPoints).fill(``).map(() => makeTripPoint(tripPoint()));
  populateDom({
    array: tripPoints,
    parentElement: tripPointsElement,
    clear: true,
    fromMock: false
  });
};

export default renderTripPoints;
