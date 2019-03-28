import {
  getRandomInt,
  getRandomElements
} from '../utils';

import {
  MIN_CITIES,
  MAX_CITIES,
  CITIES,
  START_DATE,
  END_DATE,
} from '../constants';

const tripInfo = () => {
  return {
    cities: getRandomElements(CITIES, getRandomInt(MIN_CITIES, MAX_CITIES)),
    picture: `//picsum.photos/42/42?r=${Math.random()}`,
    dateStart: new Date(new Date().setDate(getRandomInt(...START_DATE))),
    dateEnd: new Date(new Date().setDate(getRandomInt(...END_DATE))),
  };
};

export default tripInfo;