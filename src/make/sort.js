import sortBy from 'lodash.sortby';
import {
  SORTING_SELECTOR,
  OFFERS_FORM_NAME,
} from '../constants';
import sortingData from '../data/sort';
import Sort from '../render/sort';

const sortElement = document.querySelector(SORTING_SELECTOR);

const sortTasks = (tripPointsByDay, tripPointType) => {
  return tripPointsByDay.map((tripPointsInDay) => {
    const sorted = sortBy(tripPointsInDay, [(tripPoint) => tripPoint[tripPointType]]);
    return tripPointType === OFFERS_FORM_NAME ? sorted.reverse() : sorted;
  }).flat();
};

const makeSort = (tripPointsDataModel) => {
  sortElement.innerHTML = ``;

  sortingData.forEach((sortData) => {
    const tripPointsByDay = tripPointsDataModel.dataByDay;
    const sortedTripPoints = sortTasks(tripPointsByDay, sortData.tripPointType);
    const filterCompontent = new Sort(sortData);
    filterCompontent.onSort = () => {
      const sortingEvent = new Event(`sort`);
      tripPointsDataModel.sortedData = sortedTripPoints;
      document.body.dispatchEvent(sortingEvent);
    };

    sortElement.appendChild(filterCompontent.render());
  });

};

export default makeSort;
