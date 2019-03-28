import {
  FAVOURITE_ON,
  FAVOURITE_OFF,
  Types,
} from '../constants';

class ModelTripPoint {
  constructor(data) {
    this.id = data[`id`];
    this.favorite = data[`is_favorite`] ? FAVOURITE_ON : FAVOURITE_OFF;
    this.type = data[`type`] || Types.TRAVEL;
    this.timeStart = data[`date_from`];
    this.timeEnd = data[`date_to`];
    this.price = data[`base_price`];
    this.desc = data[`destination`][`description`];
    this.destination = data[`destination`][`name`];
    this.pictures = data[`destination`][`pictures`] || [];
    this.offer = data[`offers`].reduce((renamed, current) => {
      renamed.push({
        name: current.title,
        price: current.price,
        accepted: current.accepted,
      });
      return renamed;
    }, []);
  }

  toRAW() {
    return {
      'id': this.id,
      'is_favorite': this.favorite,
      'type': this.type,
      'date_from': this.timeStart,
      'date_to': this.timeEnd,
      'base_price': this.price,
      'destination': {
        'description': this.desc,
        'name': this.destination,
        'pictures': this.pictures,
      },
      'offers': this.offer.reduce((offers, current) => {
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
