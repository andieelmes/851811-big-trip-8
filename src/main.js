import {
  getRandomInt,
  checkUrlHash,
} from './utils';

import {
  MIN_NUMBER_OF_TRIP_POINTS,
  MAX_NUMBER_OF_TRIP_POINTS,
} from './constants';

import renderTripPoints, {makeTripPoints} from './actions/tripPoint';
import renderFilters from './actions/filter';
import renderTripInfo from './render/tripInfo';
import renderTripDayInfo from './render/tripDayInfo';

const defaultNumberOfTripPoints = getRandomInt(MIN_NUMBER_OF_TRIP_POINTS, MAX_NUMBER_OF_TRIP_POINTS);

const init = () => {
  const tripPoints = makeTripPoints(defaultNumberOfTripPoints);

  renderTripPoints(tripPoints);
  renderFilters(tripPoints);
  renderTripInfo();
  renderTripDayInfo();
};

init();

checkUrlHash();
