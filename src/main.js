import {
  checkUrlHash,
} from './utils';

import {
  ENDPOINT_URL,
  AUTHORIZATION,
  TRIP_POINTS_SELECTOR,
  TRIP_POINT_GET_LOADING,
  TRIP_POINT_GET_ERROR,
} from './constants';

import API from './api';

import ModelTripPoints from './model/trip-points';

import makeTripPoints from './make/trip-points';
import makeStatistics from './make/statistics';
import makeFilters from './make/filter';
import makeSort from './make/sort';
import renderTripInfo from './render/trip-info';
import renderTripDayInfo from './render/trip-day-info';

const api = new API({endPoint: ENDPOINT_URL, authorization: AUTHORIZATION});
const tripPointsWrapper = document.querySelector(TRIP_POINTS_SELECTOR);

(async () => {
  tripPointsWrapper.textContent = TRIP_POINT_GET_LOADING;
  try {
    const [tripPoints, ...rest] = await Promise.all([
      api.getTripPoints(),
      api.getDestinations(),
      api.getOffers(),
    ]);
    const tripPointsDataModel = new ModelTripPoints(tripPoints, rest);

    makeFilters(tripPointsDataModel, api);
    makeSort(tripPointsDataModel, api);
    renderTripInfo(tripPointsDataModel);
    renderTripDayInfo(tripPointsDataModel);
    makeStatistics(tripPointsDataModel);
    makeTripPoints(tripPointsDataModel, api);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`initial error: ${err}`);
    tripPointsWrapper.textContent = TRIP_POINT_GET_ERROR;
    throw err;
  }
  checkUrlHash();
})();
