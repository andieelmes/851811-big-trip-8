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
    const sortedTripPoints = tripPointsDataModel.sort(tripPointsByDay, sortType.tripPointType);
    const filterComponent = new Sort(sortType);

    filterComponent.onSort = () => {
      makeTripPoints(tripPointsDataModel, sortedTripPoints, api);
    };

    sortElement.appendChild(filterComponent.render());
  });

};

export default makeSort;
