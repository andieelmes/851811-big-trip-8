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

import renderTripPoints from './actions/tripPoint';
import renderFilters from './actions/filter';
import renderSort from './actions/sort';
import renderTripInfo from './render/tripInfo';
import renderTripDayInfo from './render/tripDayInfo';

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
    renderTripPoints(tripPoints, destinations, offers, api);

  } catch (err) {
    document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_ERROR;
  }

  checkUrlHash();

  renderTripDayInfo();
};

init();
