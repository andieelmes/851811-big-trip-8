import {getRandomInt} from '../utils';

import {
  MIN_PRICE,
  MAX_PRICE,
} from '../constants';

const makeTripPointOfferCheckbox = (offerName, chosenOffers) => {
  const idName = offerName.toLowerCase().replace(` `, ``);
  const checked = chosenOffers.some((chosenOffer) => chosenOffer[0] === offerName);
  return `<input
    class="point__offers-input visually-hidden"
    type="checkbox"
    id="${idName}"
    name="offer"
    value="${idName}"
    ${checked ? `checked` : ``}
  >
    <label for="${idName}" class="point__offers-label">
      <span class="point__offer-service">${offerName}</span> + €<span class="point__offer-price">${getRandomInt(MIN_PRICE, MAX_PRICE)}</span>
    </label>`;
};

export default makeTripPointOfferCheckbox;
