import sortBy from 'lodash.sortby';
import {
  SORTING_SELECTOR,
  OFFERS_FORM_NAME,
  SORT_TYPES
} from '../constants';

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

  SORT_TYPES.forEach((sortType) => {
    const tripPointsByDay = tripPointsDataModel.dataByDay;
    // TODO перенести сортировку в модель, тут оставить только функции, получать новые данные
    const sortedTripPoints = sortTasks(tripPointsByDay, sortType.tripPointType);
    const filterComponent = new Sort(sortType);
    filterComponent.onSort = () => {
      // TODO вызвать makeTripPoints
      const sortingEvent = new Event(`sort`);
      tripPointsDataModel.sortedData = sortedTripPoints;
      document.body.dispatchEvent(sortingEvent);
    };

    sortElement.appendChild(filterComponent.render());
  });

};

export default makeSort;
