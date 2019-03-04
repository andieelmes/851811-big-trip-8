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
  TYPES,
} from '../constants';

const tripPoint = () => {
  return {
    type: TYPES[getRandomInt(0, TYPES.length - 1)],
    offers: getRandomElements([
      `Add luggage`,
      `Switch to comfort class`,
      `Add meal`,
      `Choose seats`
    ].map((offer) => [offer, getRandomInt(MIN_PRICE, MAX_PRICE)]),
    getRandomInt(MIN_OFFER_NUMBER, MAX_OFFER_NUMBER)),
    desc: getRandomElements(LOREM_IPSUM.split(`. `), getRandomInt(1, 3)).join(`. `),
    timeStart: new Date(new Date().setHours(getRandomInt(10, 16))).setMinutes(getRandomInt(0, 59)),
    timeEnd: new Date(new Date().setHours(getRandomInt(16, 23))).setMinutes(getRandomInt(0, 59)),
    price: getRandomInt(MIN_PRICE, MAX_PRICE)
  };
};

export default tripPoint;
