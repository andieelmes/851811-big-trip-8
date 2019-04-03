import moment from 'moment';
import sortBy from 'lodash.sortby';

import {
  FilterTypes,
  OFFERS_FORM_NAME,
  DESTINATION_FORM_NAME,
  PRICE_FORM_NAME,
} from '../constants';

import {
  getOffersPrice
} from '../utils';


class ModelTripPoints {
  constructor(tripPointsData, [destinations = [], offers = []]) {
    this._data = tripPointsData;
    this._destinations = destinations;
    this._offers = offers;
    this._sortedData = null;
    this._filteredData = null;
  }

  get data() {
    return this._data;
  }

  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }

  get dataByDay() {
    return Object.values(this._data.reduce((dataByDay, tripPoint) => {
      const currentTimeStamp = moment(tripPoint.timeStart);
      const startOfDay = currentTimeStamp.startOf(`day`).unix();

      if (!dataByDay[startOfDay]) {
        dataByDay[startOfDay] = [];
      }
      dataByDay[startOfDay].push(tripPoint);
      return dataByDay;
    }, {}));
  }

  sortByTimeStamp() {
    this._data = this._data.sort((a, b) => a.timeStart - b.timeStart);
  }

  update(tripPoint) {
    const tripPointIndexToUpdate = this._data.findIndex((id) => id === tripPoint.id) || this._data.length;
    this._data[tripPointIndexToUpdate] = tripPoint;
  }

  add(tripPoint) {
    const tripPointIndex = tripPoint.id;
    this._data[tripPointIndex] = tripPoint;
  }

  filter(initialTripPointData, filterName) {
    const filterTypes = {
      [FilterTypes.EVERYTHING]: initialTripPointData,
      [FilterTypes.FUTURE]: initialTripPointData.filter((it) => it.timeEnd > moment()),
      [FilterTypes.PAST]: initialTripPointData.filter((it) => it.timeStart < moment()),
    };

    return filterTypes[filterName] || initialTripPointData;
  }

  sort(tripPointsByDay, tripPointType) {
    return tripPointsByDay.map((tripPointsInDay) => {
      if (tripPointType === DESTINATION_FORM_NAME) {
        return tripPointsInDay;
      }
      const sorted = sortBy(tripPointsInDay, [(tripPoint) => {
        return tripPointType === PRICE_FORM_NAME ? getOffersPrice(tripPoint.offers) + +tripPoint.price : tripPoint[tripPointType];
      }]);
      return tripPointType === OFFERS_FORM_NAME ? sorted.reverse() : sorted;
    }).flat();
  }
}

export default ModelTripPoints;
