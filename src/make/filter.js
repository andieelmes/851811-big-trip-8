import moment from 'moment';
import {FILTERS_SELECTOR} from '../constants';
import filtersData from '../data/filters';
import makeTripPoints from './trip-point';
import Filter from '../render/filter';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const filterTasks = (initialTasks, filterName) => {
  switch (filterName) {
    case `everything`:
      return initialTasks;

    case `future`:
      return initialTasks.filter((it) => it.timeStart > moment());

    case `past`:
      return initialTasks.filter((it) => it.timeStart < moment());

    default:
      return initialTasks;
  }
};

const makeFilters = (initialTripPoints) => {
  filtersElement.innerHTML = ``;

  filtersData.forEach((filterData) => {
    const filteredTripPoints = filterTasks(initialTripPoints, filterData.type);

    if (!filteredTripPoints.length) {
      filterData.disabled = true;
    }

    const filterCompontent = new Filter(filterData);

    filterCompontent.onFilter = () => {
      makeTripPoints(filteredTripPoints);
    };

    filtersElement.appendChild(filterCompontent.render());
  });

};

export default makeFilters;
