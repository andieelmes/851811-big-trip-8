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

import makeTripPoints from './make/trip-point';
import renderFilters from './make/filter';
import renderSort from './make/sort';
import renderTripInfo from './render/trip-info';
import renderTripDayInfo from './render/trip-day-info';

const api = new API({endPoint: ENDPOINT_URL, authorization: AUTHORIZATION});

const init = async () => {
  document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_LOADING;

  Promise.all([
    api.getTripPoints(),
    api.getDestinations(),
    api.getOffers(),
  ])
    .then((results) => {
      const tripPoints = results[0];
      renderFilters(tripPoints);
      renderSort(tripPoints);
      renderTripInfo(tripPoints);
      makeTripPoints(...results, api);
    })
    .catch(() => {
      document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_ERROR;
    });

  checkUrlHash();

  renderTripDayInfo();
};

init();
