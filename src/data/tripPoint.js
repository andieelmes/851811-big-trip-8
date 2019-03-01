import {
  getRandomInt,
  getRandomElements
} from '../utils';

import {
  MIN_PRICE,
  MAX_PRICE,
  MIN_OFFER_NUMBER,
  MAX_OFFER_NUMBER,
  LOREM_IPSUM,
} from '../constants';

const tripPoint = () => {
  return {
    icon: [
      [`Taxi`, `🚕`],
      [`Bus`, `🚌`],
      [`Train`, `🚂`],
      [`Ship`, `️🛳️`],
      [`Transport`, `🚊`],
      [`Drive`, `🚗`],
      [`Flight`, `️✈️`],
      [`Check-in`, `🏨`],
      [`Sightseeing`, `️🏛️`],
      [`Restaurant`, `🍴`]
    ][getRandomInt(0, 9)],
    cities: [
      `Paris`,
      `Dubrovnik`,
      `Barcelona`,
      `Oslo`,
      `Seul`,
      `Malmo`,
      `Amsterdam`,
      `San-Francisco`,
      `Derry`,
      `Fargo`,
      `New York`,
      `Los Angeles`
    ][getRandomInt(0, 11)],
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    offers: getRandomElements([
      `Add luggage`,
      `Switch to comfort class`,
      `Add meal`,
      `Choose seats`
    ].map((offer) => [offer, getRandomInt(MIN_PRICE, MAX_PRICE)]),
    getRandomInt(MIN_OFFER_NUMBER, MAX_OFFER_NUMBER)),
    desc: getRandomElements(LOREM_IPSUM.split(`. `), getRandomInt(1, 3)).join(`. `),
    timeStart: Date.now() + 24 * 60 * 60 * 1000 + getRandomInt(0, 3) * 60 * 60 * 1000 + getRandomInt(0, 60) * 60 * 1000,
    timeEnd: Date.now() + 24 * 60 * 60 * 1000 + getRandomInt(4, 7) * 60 * 60 * 1000 + getRandomInt(0, 60) * 60 * 1000,
    price: getRandomInt(MIN_PRICE, MAX_PRICE)
  };
};

export default tripPoint;
