import moment from 'moment';
import {FILTERS_SELECTOR} from '../constants';
import filtersData from '../data/filters';
import renderTripPoints from '../actions/tripPoint';
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
  }
};

const renderFilters = (initialTripPoints) => {
  filtersElement.innerHTML = ``;

  filtersData.forEach((filterData) => {
    const filterCompontent = new Filter(filterData);

    filterCompontent.onFilter = () => {
      const filterName = filterData.type;
      const filteredTripPoints = filterTasks(initialTripPoints, filterName);
      renderTripPoints(filteredTripPoints);
    };

    filtersElement.appendChild(filterCompontent.render());
  });

};

export default renderFilters;
