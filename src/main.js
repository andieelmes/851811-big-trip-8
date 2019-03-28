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

  try {
    const tripPoints = await api.getTripPoints();
    const destinations = await api.getDestinations();
    const offers = await api.getOffers();

    renderFilters(tripPoints);
    renderSort(tripPoints);
    renderTripInfo(tripPoints);
    makeTripPoints(tripPoints, destinations, offers, api);

  } catch (err) {
    document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_ERROR;
  }

  checkUrlHash();

  renderTripDayInfo();
};

init();
