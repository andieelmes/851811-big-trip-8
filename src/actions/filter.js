import {
  MIN_NUMBER_OF_TRIP_POINTS,
  FILTER_SELECTOR
} from '../constants';

import tripPontsMocks from '../data/tripPoints';
import {getRandomInt} from '../utils';
import renderTripPoints from '../render/tripPoint';

const onFilterClick = () => {
  const numberOfTripPoints = getRandomInt(MIN_NUMBER_OF_TRIP_POINTS, tripPontsMocks.length);
  renderTripPoints(numberOfTripPoints);
};

const subscribeToFilterClicks = () => {
  const filters = document.querySelectorAll(FILTER_SELECTOR);
  filters.forEach((filter) => {
    filter.addEventListener(`click`, onFilterClick);
  });
};

export default subscribeToFilterClicks;
