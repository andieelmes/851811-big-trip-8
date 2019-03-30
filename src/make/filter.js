import moment from 'moment';
import {FILTERS_SELECTOR} from '../constants';
import filtersData from '../data/filters';
import Filter from '../render/filter';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const filterTasks = (initialTripPointData, filterName) => {
  switch (filterName) {
    case `everything`:
      return initialTripPointData;

    case `future`:
      return initialTripPointData.filter((it) => it.timeEnd > moment());

    case `past`:
      return initialTripPointData.filter((it) => it.timeStart < moment());

    default:
      return initialTripPointData;
  }
};

const makeFilters = (tripPointsDataModel) => {
  filtersElement.innerHTML = ``;

  const initialTripPointData = tripPointsDataModel.data;

  filtersData.forEach((filterData) => {
    const filteredTripPoints = filterTasks(initialTripPointData, filterData.type);

    if (!filteredTripPoints.length) {
      filterData.disabled = true;
    }

    const filterCompontent = new Filter(filterData);

    filterCompontent.onFilter = () => {
      const filterEvent = new Event(`filter`);
      tripPointsDataModel.filteredData = filteredTripPoints;
      document.body.dispatchEvent(filterEvent);
    };

    filtersElement.appendChild(filterCompontent.render());
  });

};

export default makeFilters;
