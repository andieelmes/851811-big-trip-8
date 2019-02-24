import {
  getRandomInt,
} from '../utils';

import {
  MIN_PRICE,
  MAX_PRICE,
} from '../constants';

const offerNames = [`Order a pizza`, `Get a lux suite`, `Great views`, `March apples`, `Plenty of food`, `Nice mani`, `Buy 2 get 3`];

const offers = offerNames.map((offerName) => {
  return {
    name: offerName,
    price: getRandomInt(MIN_PRICE, MAX_PRICE)
  };
});

export default offers;
