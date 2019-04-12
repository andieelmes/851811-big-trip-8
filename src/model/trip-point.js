import {
  FAVOURITE_ON,
  FAVOURITE_OFF,
  Types,
} from '../constants';

class ModelTripPoint {
  constructor(data, config = {raw: true}) {
    const {
      raw,
    } = config;
    data = raw ? data : this.toRAW(data);

    console.log(data);

    this.id = data[`id`];
    this.favorite = data[`is_favorite`] ? FAVOURITE_ON : FAVOURITE_OFF;
    this.type = data[`type`] || Types.TRAVEL;
    this.timeStart = data[`date_from`] || data[`timeStart`];
    this.timeEnd = data[`date_to`] || data[`timeEnd`];
    this.price = data[`base_price`] || data[`price`];
    this.desc = data[`destination`][`description`] || data[`desc`];
    this.destination = data[`destination`][`name`] || data[`destination`];
    this.pictures = data[`destination`][`pictures`] || data[`pictures`] || [];
    this.offers = data[`offers`].reduce((renamed, current) => {
      renamed.push({
        name: current.title || current.name,
        price: current.price,
        accepted: current.accepted || false,
      });
      return renamed;
    }, []);

    console.log(this);

  }

  toRAW(data) {
    return {
      'id': data.id,
      'is_favorite': data.favorite,
      'type': data.type.toLowerCase(),
      'date_from': data.timeStart,
      'date_to': data.timeEnd,
      'base_price': data.price,
      'destination': {
        'description': data.desc,
        'name': data.destination,
        'pictures': data.pictures,
      },
      'offers': data.offers.reduce((offers, current) => {
        offers.push({
          title: current.name,
          price: current.price,
          accepted: current.accepted,
        });
        return offers;
      }, [])
    };
  }

  static parseTripPoint(data) {
    return new ModelTripPoint(data);
  }

  parseTripPointWithFrontData(data) {
    const tripPointData = this.toRAW(data);
    return new ModelTripPoint(tripPointData);
  }

  static parseTripPoints(data) {
    return data.filter((tripPointInfo) => tripPointInfo).map(ModelTripPoint.parseTripPoint);
  }
}

export default ModelTripPoint;
