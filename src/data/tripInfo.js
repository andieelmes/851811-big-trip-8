import {
  getRandomInt,
  getRandomElements
} from '../utils';

import {
  MIN_CITIES,
  MAX_CITIES,
  MIN_TOTAL_PRICE,
  MAX_TOTAL_PRICE,
} from '../constants';

const tripInfo = () => {
  return {
    cities: getRandomElements([
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
    ], getRandomInt(MIN_CITIES, MAX_CITIES)),
    picture: `//picsum.photos/42/42?r=${Math.random()}`,
    dateStart: Date.now() + 24 * 60 * 60 * 1000,
    dateEnd: Date.now() + getRandomInt(2, 5) * 24 * 60 * 60 * 1000,
    totalPrice: getRandomInt(MIN_TOTAL_PRICE, MAX_TOTAL_PRICE)
  };
};

export default tripInfo;