import {FILTERS_SELECTOR, FilterTypes} from '../constants';
import Filter from '../render/filter';
import makeTripPoints from '../make/trip-points';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const makeFilters = (tripPointsDataModel, api) => {
  filtersElement.innerHTML = ``;

  const initialTripPointData = tripPointsDataModel.data;

  Object.values(FilterTypes).forEach((filterTypeName) => {
    // TODO перенести фильтрацию в модель, тут оставить только функции-фильтры, получать новые данные
    const filteredTripPoints = tripPointsDataModel.filter(initialTripPointData, filterTypeName);

    let filterData = {};
    filterData.type = filterTypeName;

    if (!filteredTripPoints.length) {
      filterData.disabled = true;
    }

    const filterCompontent = new Filter(filterData);

    filterCompontent.onFilter = () => {
      tripPointsDataModel.data = filteredTripPoints;
      makeTripPoints(tripPointsDataModel, api);
    };

    filtersElement.appendChild(filterCompontent.render());
  });

};

export default makeFilters;
