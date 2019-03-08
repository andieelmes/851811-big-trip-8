import {
  getRandomInt,
  getRandomElements
} from '../utils';

import {
  MIN_CITIES,
  MAX_CITIES,
  MIN_TOTAL_PRICE,
  MAX_TOTAL_PRICE,
  CITIES,
  START_DATE,
  END_DATE,
} from '../constants';

const tripInfo = () => {
  return {
    cities: getRandomElements(CITIES, getRandomInt(MIN_CITIES, MAX_CITIES)),
    picture: `//picsum.photos/42/42?r=${Math.random()}`,
    dateStart: new Date(new Date().setDate(START_DATE)),
    dateEnd: new Date(new Date().setDate(END_DATE)),
    totalPrice: getRandomInt(MIN_TOTAL_PRICE, MAX_TOTAL_PRICE)
  };
};

export default tripInfo;
