import moment from 'moment';

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

  get sortedData() {
    return this._sortedData || this._data;
  }

  get filteredData() {
    return this._filteredData || this._data;
  }

  get dataByDay() {
    return Object.values(this._data.reduce((dataByDay, tripPoint) => {
      const currentTimeStamp = moment(tripPoint.timeStart);
      const startOfDay = currentTimeStamp.startOf(`day`).unix();

      if (!dataByDay[startOfDay]) {
        dataByDay[startOfDay] = [];
      }
      dataByDay[startOfDay].push(tripPoint)
      return dataByDay;
    }, {}));
  }

  set sortedData(data) {
    this._sortedData = data;
  }

  set filteredData(data) {
    this._filteredData = data;
  }

  sortByTimeStamp() {
    this._data = this._data.sort((a, b) => a.timeStart - b.timeStart);
  }

  update(tripPoint) {
    const tripPointIndexToUpdate = this._data.findIndex((id) => id === tripPoint.id) || this._data.length;
    this._data[tripPointIndexToUpdate] = tripPoint;
  }
}

export default ModelTripPoints;
