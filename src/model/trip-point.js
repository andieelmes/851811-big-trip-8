import {
  FAVOURITE_ON,
  FAVOURITE_OFF,
  Types,
} from '../constants';

class ModelTripPoint {
  constructor(data) {
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
  }

  toRAW() {
    return {
      'id': this.id,
      'is_favorite': this.favorite,
      'type': this.type.toLowerCase(),
      'date_from': this.timeStart,
      'date_to': this.timeEnd,
      'base_price': this.price,
      'destination': {
        'description': this.desc,
        'name': this.destination,
        'pictures': this.pictures,
      },
      'offers': this.offers.reduce((offers, current) => {
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

  static parseTripPoints(data) {
    return data.filter((tripPointInfo) => tripPointInfo).map(ModelTripPoint.parseTripPoint);
  }
}

export default ModelTripPoint;
