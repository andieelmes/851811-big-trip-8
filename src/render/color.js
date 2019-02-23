import {getRandomInt} from '../utils';

const makeColor = (color) => {
  const checked = getRandomInt(1, 2) === 1;
  return `<input
      type="radio"
      id="color-${color}-2"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${checked ? `checked` : ``}
    />
    <label
      for="color-black-2"
      class="card__color card__color--${color}"
      >${color}</label
    >`;
};

const makeColors = (colors) => colors.map((color) => makeColor(color)).join(``);

export default makeColors;
