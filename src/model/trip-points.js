import moment from 'moment';

class ModelTripPoints {
  constructor(tripPointsData) {
    this._data = tripPointsData;
    this._sortedData = null;
    this._filteredData = null;
  }

  get data() {
    return this._data;
  }

  get sortedData() {
    return this._sortedData || this._data;
  }

  get filteredData() {
    return this._filteredData || this._data;
  }

  get dataByDay() {
    const timeStamps = this._data.map((tripPoint) => tripPoint.timeStart);

    const dayTimestamps = timeStamps.reduce((dayStamps, timeStamp) => {
      const currentTimeStamp = moment(timeStamp);
      const startOfDay = currentTimeStamp.startOf(`day`);

      if (dayStamps.every((dayStamp) => !dayStamp.isSame(startOfDay))) {
        dayStamps.push(startOfDay);
      }
      return dayStamps;
    }, []);

    return dayTimestamps.map((timeStamp) => this._data.filter((tripPoint) => moment(tripPoint.timeStart).startOf(`day`).isSame(timeStamp)));
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

  update(data) {
    const tripPointIndexToUpdate = this._data.findIndex((id) => id === data.id);
    this._data[tripPointIndexToUpdate] = {...data};
  }
}

export default ModelTripPoints;
