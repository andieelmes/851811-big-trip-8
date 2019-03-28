import sortBy from 'lodash.sortby';
import {
  SORTING_SELECTOR,
  OFFERS_FORM_NAME,
} from '../constants';
import sortingData from '../data/sort';
import makeTripPoints from './trip-point';
import Sort from '../render/sort';

const sortElement = document.querySelector(SORTING_SELECTOR);

const sortTasks = (initialTasks, tripPointType) => {
  const sorted = sortBy(initialTasks, [(tripPoint) => tripPoint[tripPointType]]);
  return tripPointType === OFFERS_FORM_NAME ? sorted.reverse() : sorted;
};

const makeSort = (initialTripPoints) => {
  sortElement.innerHTML = ``;

  sortingData.forEach((sortData) => {
    const filteredTripPoints = sortTasks(initialTripPoints, sortData.tripPointType);
    const filterCompontent = new Sort(sortData);
    filterCompontent.onSort = () => {
      makeTripPoints(filteredTripPoints);
    };

    sortElement.appendChild(filterCompontent.render());
  });

};

export default makeSort;
