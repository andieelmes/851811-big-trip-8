import {getRandomInt} from '../utils';

const makeFilter = (filterName) => {
  const checked = getRandomInt(1, 2) === 1;

  return `<input type="radio"
    id="filter-${filterName}"
    name="filter"
    value="${filterName}"
    ${checked ? `checked` : ``}
  >
  <label class="trip-filter__item" for="filter-${filterName}">
    ${filterName[0].toUpperCase() + filterName.slice(1)}
  </label>`;
};

export default makeFilter;
