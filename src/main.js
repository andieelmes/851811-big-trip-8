import {populateDom} from './utils';
import filterMocks from './data/filters';

import {
  FILTERS_SELECTOR,
  STATS_BTN_SELECTOR,
  TRIP_POINTS_TABLE_BTN_SELECTOR,
} from './constants';

import makeFilter from './render/filter';
import renderTripPoints from './actions/tripPoint';
import renderTripInfo from './render/tripInfo';
import renderTripDayInfo from './render/tripDayInfo';
import subscribeToFilterClicks from './actions/filter';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const init = () => {
  populateDom({
    array: filterMocks,
    parentElement: filtersElement,
    render: makeFilter,
    clear: true
  });
  renderTripPoints();
  renderTripInfo();
  renderTripDayInfo();
  subscribeToFilterClicks();
};

init();
