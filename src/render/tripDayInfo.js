import {appendToDom} from '../utils';
import {TRIP_DAY_INFO_SELECTOR} from '../constants';
import tripDayInfo from '../data/tripDayInfo';

const tripDayInfoElement = document.querySelector(TRIP_DAY_INFO_SELECTOR);

const makeTripDayInfo = (config) => {
  const {
    number,
    date,
  } = config;

  return `<span class="trip-day__caption">Day</span>
  <p class="trip-day__number">${number}</p>
  <h2 class="trip-day__title">${new Date(date).toLocaleDateString(`en-gb`, {month: `short`})}&nbsp;
  ${new Date(date).toLocaleDateString(`en-gb`, {day: `2-digit`})}</h2>`;
};

const renderTripDayInfo = () => {
  appendToDom({
    newElements: makeTripDayInfo(tripDayInfo()),
    parentElement: tripDayInfoElement,
    clear: true,
  });
};

export default renderTripDayInfo;
