import moment from 'moment';
import {FILTERS_SELECTOR, FILTER_TYPES} from '../constants';
import Filter from '../render/filter';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const filterTasks = (initialTripPointData, filterName) => {
  // TODO объект с функциями вместо switch, enum для фильтров
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

  FILTER_TYPES.forEach((filterType) => {
    // TODO перенести фильтрацию в модель, тут оставить только функции-фильтры, получать новые данные
    const filteredTripPoints = filterTasks(initialTripPointData, filterType.type);

    if (!filteredTripPoints.length) {
      filterType.disabled = true;
    }

    const filterCompontent = new Filter(filterType);

    filterCompontent.onFilter = () => {
      // TODO вызвать makeTripPoints
      const filterEvent = new Event(`filter`);
      tripPointsDataModel.filteredData = filteredTripPoints;
      document.body.dispatchEvent(filterEvent);
    };

    filtersElement.appendChild(filterCompontent.render());
  });

};

export default makeFilters;
