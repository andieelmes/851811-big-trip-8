import moment from 'moment';
import sortBy from 'lodash.sortby';

import {
  FilterType,
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
    return ModelTripPoints.sortTripPointsByDay(this._data);
  }

  sortByTimeStamp() {
    this._data = this._data.sort((a, b) => a.timeStart - b.timeStart);
  }

  update(tripPoint) {
    const tripPointIndexToUpdate = this._data.findIndex((id) => id === tripPoint.id);
    this._data[tripPointIndexToUpdate] = tripPoint;
  }

  remove(id) {
    const tripPointIndexToRemove = this._data.findIndex((point) => point.id === id);
    this._data.splice(tripPointIndexToRemove, 1);
  }

  add(tripPoint) {
    const tripPointIndex = tripPoint.id;
    this._data[tripPointIndex] = tripPoint;
  }

  filter(initialTripPointData, filterName) {
    const filterType = {
      [FilterType.EVERYTHING]: initialTripPointData,
      [FilterType.FUTURE]: initialTripPointData.filter((it) => it.timeEnd > moment()),
      [FilterType.PAST]: initialTripPointData.filter((it) => it.timeStart < moment()),
    };

    return filterType[filterName] || initialTripPointData;
  }

  sort(tripPointsData, tripPointType) {
    const tripPointsByDay = ModelTripPoints.sortTripPointsByDay(tripPointsData);

    return tripPointsByDay.map((tripPointsInDay) => {
      if (tripPointType === DESTINATION_FORM_NAME) {
        return tripPointsInDay;
      }
      const sorted = sortBy(tripPointsInDay, [(tripPoint) => {
        return tripPointType === PRICE_FORM_NAME ? +getOffersPrice(tripPoint.offers) + +tripPoint.price : tripPoint[tripPointType];
      }]);
      return tripPointType === OFFERS_FORM_NAME ? sorted.reverse() : sorted;
    }).flat();
  }

  static sortTripPointsByDay(data) {
    return Object.values(data.reduce((dataByDay, tripPoint) => {
      const currentTimeStamp = moment(tripPoint.timeStart);
      const startOfDay = currentTimeStamp.startOf(`day`).unix();

      if (!dataByDay[startOfDay]) {
        dataByDay[startOfDay] = [];
      }
      dataByDay[startOfDay].push(tripPoint);
      return dataByDay;
    }, {}));
  }
}

export default ModelTripPoints;
