import {
  SORTING_SELECTOR,
  SORT_TYPES
} from '../constants';

import Sort from '../render/sort';
import makeTripPoints from '../make/trip-points';

const sortElement = document.querySelector(SORTING_SELECTOR);

const makeSort = (tripPointsDataModel, api) => {
  sortElement.innerHTML = ``;

  SORT_TYPES.forEach((sortType) => {
    const tripPointsByDay = tripPointsDataModel.dataByDay;
    // TODO перенести сортировку в модель, тут оставить только функции, получать новые данные
    const sortedTripPoints = tripPointsDataModel.sort(tripPointsByDay, sortType.tripPointType);
    const filterComponent = new Sort(sortType);

    filterComponent.onSort = () => {
      // TODO вызвать makeTripPoints
      tripPointsDataModel.data = sortedTripPoints;
      makeTripPoints(tripPointsDataModel, api);
    };

    sortElement.appendChild(filterComponent.render());
  });

};

export default makeSort;
