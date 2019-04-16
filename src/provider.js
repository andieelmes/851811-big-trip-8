import {objectToArray} from './utils';
import ModelTripPoint from './model/trip-point';

const Provider = class {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;

    this._sendToStore = this._sendToStore.bind(this);
  }

  updateTripPoint({id, data}) {
    if (this._isOnline()) {
      return this._api.updateTripPoint({id, data})
        .then((tripPoint) => {
          this._sendToStore(tripPoint, true);
          return tripPoint;
        });
    } else {
      const tripPoint = data;
      this._needSync = true;

      this._store.setItem(tripPoint);
      return Promise.resolve(ModelTripPoint.parseTripPoint(tripPoint));
    }
  }

  createTripPoint(tripPoint) {
    if (this._isOnline()) {
      return this._api.createTripPoint(tripPoint, true)
        .then((createdTripPoint) => {
          this._sendToStore(createdTripPoint);
          return createdTripPoint;
        });
    } else {
      tripPoint.id = this._generateId();
      this._needSync = true;

      this._sendToStore(tripPoint);
      return Promise.resolve(ModelTripPoint.parseTripPoint(tripPoint));
    }
  }

  deleteTripPoint({id}) {
    if (this._isOnline()) {
      return this._api.deleteTripPoint({id})
        .then(() => {
          this._store.removeItem({key: id});
        });
    } else {
      this._needSync = true;

      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  getTripPoints() {
    if (this._isOnline()) {
      return this._api.getTripPoints()
        .then((tripPoints) => {
          tripPoints.map(((tripPoint) => this._sendToStore(tripPoint, true)));
          return tripPoints;
        });
    } else {
      const rawTripPointsMap = this._store.getAll();
      const rawTripPoints = objectToArray(rawTripPointsMap);
      const tripPoints = ModelTripPoint.parseTripPoints(rawTripPoints);

      return Promise.resolve(tripPoints);
    }
  }

  syncTripPoints() {
    return this._api.syncTripPoints(objectToArray(this._store.getAll()));
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  _sendToStore(point, toRaw = false) {
    return this._store.setItem({key: point.id, item: toRaw ? point.toRAW() : point});
  }
};

export default Provider;
