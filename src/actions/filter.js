import {
  MIN_NUMBER_OF_TRIP_POINTS,
  MAX_NUMBER_OF_TRIP_POINTS,
  FILTER_SELECTOR
} from '../constants';

import {getRandomInt} from '../utils';
import renderTripPoints from './tripPoint';

const onFilterClick = () => {
  const numberOfTripPoints = getRandomInt(MIN_NUMBER_OF_TRIP_POINTS, MAX_NUMBER_OF_TRIP_POINTS);
  renderTripPoints(numberOfTripPoints);
};

const subscribeToFilterClicks = () => {
  const filters = document.querySelectorAll(FILTER_SELECTOR);
  filters.forEach((filter) => {
    filter.addEventListener(`click`, onFilterClick);
  });
};

export default subscribeToFilterClicks;
