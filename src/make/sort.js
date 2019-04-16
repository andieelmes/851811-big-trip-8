import {
  SORTING_SELECTOR,
  SORT_TYPES
} from '../constants';

import Sort from '../render/sort';
import makeTripPoints from '../make/trip-points';

const sortElement = document.querySelector(SORTING_SELECTOR);

const makeSort = (tripPointsDataModel, tripPointsData, provider) => {
  sortElement.innerHTML = ``;

  SORT_TYPES.forEach((sortType) => {
    const sortedTripPoints = tripPointsDataModel.sort(tripPointsData, sortType.tripPointType);
    const filterComponent = new Sort(sortType);

    filterComponent.onSort = () => {
      makeTripPoints(tripPointsDataModel, sortedTripPoints, provider);
    };

    sortElement.appendChild(filterComponent.render());
  });

};

export default makeSort;
