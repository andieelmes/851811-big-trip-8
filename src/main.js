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

import makeTripPoints from './make/trip-point';
import makeStatistics from './make/statistics';
import makeFilters from './make/filter';
import makeSort from './make/sort';
import renderTripInfo from './render/trip-info';
import renderTripDayInfo from './render/trip-day-info';

const api = new API({endPoint: ENDPOINT_URL, authorization: AUTHORIZATION});

const init = async () => {
  document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_LOADING;

  await Promise.all([
    api.getTripPoints(),
    api.getDestinations(),
    api.getOffers(),
  ])
    .then((results) => {
      const [
        tripPoints,
        ...rest
      ] = results;

      const tripPointsDataModel = new ModelTripPoints(tripPoints);

      makeFilters(tripPointsDataModel);
      makeSort(tripPointsDataModel);
      renderTripInfo(tripPointsDataModel);
      renderTripDayInfo(tripPointsDataModel);
      makeTripPoints(tripPointsDataModel, ...rest, api);
      makeStatistics(tripPointsDataModel.data);

      checkUrlHash();

    })
    .catch((err) => {
      console.error(`initial error: ${err}`);
      document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_ERROR;
    });
};

init();
