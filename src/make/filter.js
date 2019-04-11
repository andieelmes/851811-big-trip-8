import {FILTERS_SELECTOR, FilterTypes} from '../constants';
import Filter from '../render/filter';
import makeTripPoints from '../make/trip-points';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const makeFilters = (tripPointsDataModel, provider) => {
  filtersElement.innerHTML = ``;

  const initialTripPointData = tripPointsDataModel.data;

  Object.values(FilterTypes).forEach((filterTypeName) => {
    const filteredTripPoints = tripPointsDataModel.filter(initialTripPointData, filterTypeName);

    let filterData = {};
    filterData.type = filterTypeName;

    if (!filteredTripPoints.length) {
      filterData.disabled = true;
    }

    const filterCompontent = new Filter(filterData);

    filterCompontent.onFilter = () => {
      makeTripPoints(tripPointsDataModel, filteredTripPoints, provider);
    };

    filtersElement.appendChild(filterCompontent.render());
  });

};

export default makeFilters;
