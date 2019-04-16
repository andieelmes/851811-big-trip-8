import {FILTERS_SELECTOR, FilterType} from '../constants';
import Filter from '../render/filter';
import makeTripPoints from './trip-points';
import makeSort from './sort';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const makeFilters = (tripPointsDataModel, provider) => {
  filtersElement.innerHTML = ``;

  const initialTripPointData = tripPointsDataModel.data;

  Object.values(FilterType).forEach((filterTypeName) => {
    const filteredTripPoints = tripPointsDataModel.filter(initialTripPointData, filterTypeName);

    let filterData = {};
    filterData.type = filterTypeName;

    if (!filteredTripPoints.length) {
      filterData.disabled = true;
    }

    const filterComponent = new Filter(filterData);

    filterComponent.onFilter = () => {
      makeTripPoints(tripPointsDataModel, filteredTripPoints, provider);
      makeSort(tripPointsDataModel, filteredTripPoints, provider);
    };

    filtersElement.appendChild(filterComponent.render());
  });

};

export default makeFilters;
