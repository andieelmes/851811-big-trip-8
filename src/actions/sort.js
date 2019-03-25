import sortBy from 'lodash.sortby';
import {SORTING_SELECTOR} from '../constants';
import sortingData from '../data/sort';
import renderTripPoints from '../actions/tripPoint';
import Sort from '../render/sort';

const sortElement = document.querySelector(SORTING_SELECTOR);

const sortTasks = (initialTasks, tripPointType) => {
  const sorted = sortBy(initialTasks, [(tripPoint) => tripPoint[tripPointType]]);
  if (tripPointType === `offer`) {
    return sorted.reverse();
  }
  return sorted;
};

const renderSort = (initialTripPoints) => {
  sortElement.innerHTML = ``;

  sortingData.forEach((sortData) => {
    const filteredTripPoints = sortTasks(initialTripPoints, sortData.tripPointType);
    const filterCompontent = new Sort(sortData);
    filterCompontent.onSort = () => {
      renderTripPoints(filteredTripPoints);
    };

    sortElement.appendChild(filterCompontent.render());
  });

};

export default renderSort;
