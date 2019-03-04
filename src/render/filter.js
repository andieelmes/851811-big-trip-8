import {getRandomBool} from '../utils';

const makeFilter = (filterName) => {
  return `<input type="radio"
    id="filter-${filterName}"
    name="filter"
    value="${filterName}"
    ${getRandomBool() ? `checked` : ``}
  >
  <label
    class="trip-filter__item"
    for="filter-${filterName}"
  >
    ${filterName[0].toUpperCase() + filterName.slice(1)}
  </label>`;
};

export default makeFilter;
