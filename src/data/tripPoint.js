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
  CITIES,
  OFFERS,
  START_HOURS,
  END_HOURS,
  MINUTES,
} from '../constants';

const tripPoint = () => {
  return {
    allTypes: TYPES,
    type: [...TYPES][getRandomInt(0, TYPES.size - 1)],
    allOffers: OFFERS,
    offer: getRandomElements(OFFERS.map((offer) => [offer, getRandomInt(MIN_PRICE, MAX_PRICE)]),
        getRandomInt(MIN_OFFER_NUMBER, MAX_OFFER_NUMBER)),
    desc: getRandomElements(LOREM_IPSUM.split(`. `), getRandomInt(1, 3)).join(`. `),
    timeStart: new Date(new Date().setHours(getRandomInt(...START_HOURS))).setMinutes(getRandomInt(...MINUTES)),
    timeEnd: new Date(new Date().setHours(getRandomInt(...END_HOURS))).setMinutes(getRandomInt(...MINUTES)),
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
    allCitites: CITIES,
    destination: CITIES[getRandomInt(0, CITIES.length - 1)],
    pictures: new Array(getRandomInt(2, 4)).fill(``).map(() => `//picsum.photos/330/140?r=${Math.random()}`),
    favorite: `off`,
  };
};

export default tripPoint;
