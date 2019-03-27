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

const init = () => {
  document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_LOADING;
  api.getTripPoints()
    .then((tripPoints) => {
      renderFilters(tripPoints);
      renderSort(tripPoints);
      renderTripInfo(tripPoints);
      api.getDestinations()
        .then((destinations) => {
          api.getOffers()
            .then((offers) => {
              renderTripPoints(tripPoints, destinations, offers, api);
            });
        });
    })
    .catch(() => {
      document.querySelector(TRIP_POINTS_SELECTOR).textContent = TRIP_POINT_GET_ERROR;
    });

  renderTripDayInfo();
};

init();

checkUrlHash();
