import {
  checkUrlHash,
} from './utils';

import {
  ENDPOINT_URL,
  AUTHORIZATION,
  TRIP_POINTS_SELECTOR,
  TRIP_POINT_GET_LOADING,
  TRIP_POINT_GET_ERROR,
  TRIP_POINT_STORE_KEY,
} from './constants';

import API from './api';
import Provider from './provider';
import Store from './store';

import ModelTripPoints from './model/trip-points';

import makeTripPoints from './make/trip-points';
import makeStatistics from './make/statistics';
import makeFilters from './make/filter';
import makeSort from './make/sort';
import renderTripInfo from './render/trip-info';
import renderTripDayInfo from './render/trip-day-info';

const api = new API({endPoint: ENDPOINT_URL, authorization: AUTHORIZATION});
const store = new Store({key: TRIP_POINT_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => String(Date.now())});
const tripPointsWrapper = document.querySelector(TRIP_POINTS_SELECTOR);

(async () => {
  tripPointsWrapper.textContent = TRIP_POINT_GET_LOADING;
  try {
    const [tripPoints, ...rest] = await Promise.all([
      provider.getTripPoints(),
      api.getDestinations(),
      api.getOffers(),
    ]);
    const tripPointsDataModel = new ModelTripPoints(tripPoints, rest);

    makeFilters(tripPointsDataModel, provider);
    makeSort(tripPointsDataModel, provider);
    renderTripInfo(tripPointsDataModel);
    renderTripDayInfo(tripPointsDataModel);
    makeStatistics(tripPointsDataModel);
    makeTripPoints(tripPointsDataModel, tripPointsDataModel.data, provider);

    window.addEventListener(`offline`, () => {
      document.title = `${document.title}[OFFLINE]`;
    });
    window.addEventListener(`online`, () => {
      document.title = document.title.split(`[OFFLINE]`)[0];
      provider.syncTripPoints();
    });

  } catch (err) {
    tripPointsWrapper.textContent = TRIP_POINT_GET_ERROR;
    throw err;
  }
  checkUrlHash();
})();
